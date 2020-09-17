import React, { useEffect, useRef, useState } from 'react';
import { IMessage, Sender } from '../../../api/tasks-api/session';
import {
  ITask,
  TasksStore,
  TaskStatuses,
} from '../../../effector/tasks-store/store';
import { consumeUserTaskAction } from '../../../effector/chat/events';
import { TowersTypes } from '../../../effector/towers-progress/store';
import { ITabSwitchers } from '../index';
import { CouponTypes, UserMarketStore } from '../../../effector/coupons/store';
import { ChatStore } from '../../../effector/chat/store';
import { hideMarker, setMarker } from '../../../effector/towers-marker/events';
import { IChatButtons } from '../../../UI/chat-buttons';
import { MarkerTypes } from '../../markers';
import { useStore } from 'effector-react';
import { setHideTowerInfo } from '../../../effector/tower-info-modal-store/events';
import { IModalWindow } from '../../modal-window';
import { chatEndedHandler } from '../../../utils/chat-ended-handler';
import { checkChatSession } from '../../../utils/check-chat-session';
import { setCurrentTaskStatus } from '../../../effector/tasks-store/events';
import newMessage from '../../../sound/newMessage.wav';
import { SettingsStore } from '../../../effector/settings/store';
import { useAudio } from '../../../hooks/use-sound';
import { usePlaySoundIf } from '../../../hooks/use-play-sound-if';
import { MissionsStore } from '../../../effector/missions-store/store';
import { TaskTypes } from '../../../app';
import { TowerInfoChatLayout } from './layout';

export const couponModalConfig = {
  title: 'Выбор купона',
  popUpStyles: {
    width: 535,
    padding: '40px 74px 40px 50px',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height: 354,
  },
  submitButtonText: 'Использовать',
  cancelButtonText: 'Отмена',
};

const lettersPerSecond = 70,
  ms = 1000;
const calculateMessageDelay = (letters: number) =>
  (letters / lettersPerSecond) * ms;

const findSubtask = (taskId: number): ITask | undefined => {
  const missions = MissionsStore.getState();
  for (let i = 0; i < missions.length; i++)
    for (let j = 0; j < missions[i].userSubTasks.length; j++)
      if (missions[i].userSubTasks[j].id === taskId)
        return missions[i].userSubTasks[j];
};
export enum PromiseStatus {
  PENDING = 'pending',
  RESOLVED = 'resolved',
}
const checkMyMessages = (message: IMessage) =>
  message.direction === Sender.FRONTEND;
const checkBotsMessages = (message: IMessage) =>
  message.direction === Sender.BACKEND;

const extraDelay = 700;

export const TowerInfoChat: React.FC<ITowerInfoChat> = ({
  towerTitle,
  switchers,
}) => {
  const wantedTaskStatuses = new Set([
    TaskTypes.PRODUCT_QUIZ,
    TaskTypes.RELATED_QUIZ,
  ]);

  const { userCoupons } = useStore(UserMarketStore);
  const tasks = useStore(TasksStore);
  const { blockId, taskId, actions, messages, ended } = useStore(ChatStore)[
    towerTitle
  ];

  const [openCouponModal, setOpenCouponModal] = useState(false);
  const [responseStatus, setResponseStatus] = useState(PromiseStatus.PENDING);
  const [savedMessages, setSavedMessages] = useState<IMessage[]>([]);
  const [failedTask, setFailedTask] = useState(false);

  const currentTask = findSubtask(taskId) || tasks.find(el => el.id === taskId);
  const { count: couponReplaceCount } = userCoupons[CouponTypes.COUPON_REPLACE],
    { count: couponSkipCount } = userCoupons[CouponTypes.COUPON_SKIP];

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const haveMessages = messages && messages.length > 0;

  const sendAnswerId = async (actionId: number) => {
    if (responseStatus === PromiseStatus.RESOLVED && currentTask) {
      const { data } = await consumeUserTaskAction({
        taskId: currentTask.id,
        blockId,
        actionId,
        towerTitle,
      });
      setResponseStatus(PromiseStatus.PENDING);
      if (data.ended) {
        if (wantedTaskStatuses.has(currentTask.taskTypeSlug)) {
          chatEndedHandler(taskId, towerTitle);
        } else {
          setCurrentTaskStatus({
            taskId: currentTask.id,
            status: TaskStatuses.DONE,
          });
          setMarker({
            towerTitle,
            type: MarkerTypes.SUCCESS,
          });
          switchers.openTasksTab();
        }
        hideMarker({ towerTitle, type: MarkerTypes.ACTIVE_TASK });
      }
    }
  };

  const showCouponInterfaceWhenTaskIsFailed = ended && failedTask;
  const { volume } = useStore(SettingsStore).sound;

  const scrollToBottom = () =>
    chatContainerRef.current &&
    chatContainerRef.current.scrollTo(0, chatContainerRef.current.scrollHeight);

  const { play: newMessagePlay } = useAudio(newMessage, false, volume);
  usePlaySoundIf<IMessage[]>(
    haveMessages && !!volume,
    newMessagePlay,
    messages
  );

  useEffect(() => {
    setHideTowerInfo(true);
  }, []);

  useEffect(() => {
    !haveMessages &&
      currentTask &&
      checkChatSession(currentTask, taskId, towerTitle);
    scrollToBottom();
    return () => {
      setHideTowerInfo(false);
    };
  }, [towerTitle]);

  useEffect(() => {
    if (!messages) return;
    const newMessages = messages.slice(savedMessages.length, messages.length);
    const myNewMessages = newMessages.filter(msg => checkMyMessages(msg));
    const botsNewMessages = newMessages.filter(msg => checkBotsMessages(msg));
    const isLast = (idx: number) => botsNewMessages.length - 1 === idx;
    if (!savedMessages.length) {
      messages.length && setResponseStatus(PromiseStatus.RESOLVED);
      if (myNewMessages.length) {
        setSavedMessages(messages);
      } else {
        let delay = 0;
        setResponseStatus(PromiseStatus.PENDING);
        botsNewMessages.forEach((msg, idx) => {
          delay += calculateMessageDelay(msg.text.length);
          setTimeout(() => {
            setSavedMessages(prevState => [...prevState, msg]);
            isLast(idx) && setResponseStatus(PromiseStatus.RESOLVED);
          }, delay);
        });
      }
    } else {
      setSavedMessages(prevState => [...prevState, ...myNewMessages]);
      botsNewMessages.forEach((msg, idx) => {
        setTimeout(() => {
          setSavedMessages(prevState => {
            isLast(idx) && setResponseStatus(PromiseStatus.RESOLVED);
            return [...prevState, msg];
          });
        }, calculateMessageDelay(msg.text.length) + extraDelay * (idx + 1));
      });
      setResponseStatus(PromiseStatus.RESOLVED);
    }
  }, [messages]);

  const checkLastMessage = () =>
    messages && messages[messages.length - 1]?.failedTask;

  useEffect(() => {
    scrollToBottom();
    checkLastMessage() ? setFailedTask(true) : setFailedTask(false);
  }, [savedMessages, messages]);

  const chatButtonsProps: IChatButtons = {
    haveCoupon: showCouponInterfaceWhenTaskIsFailed,
    couponCallback: () => setOpenCouponModal(true),
    couponCount: couponReplaceCount + couponSkipCount,
    callback: sendAnswerId,
    actions,
  };

  const modalWindowProps: IModalWindow = {
    displayFlag: openCouponModal,
    cancelHandler: () => setOpenCouponModal(false),
    id: taskId,
    towerTitle,
    ...couponModalConfig,
  };

  return (
    <TowerInfoChatLayout
      towerTitle={towerTitle}
      chatButtonsProps={chatButtonsProps}
      chatContainerRef={chatContainerRef}
      haveMessages={haveMessages}
      modalWindowProps={modalWindowProps}
      responseStatus={responseStatus}
      savedMessages={savedMessages}
    />
  );
};

interface ITowerInfoChat {
  towerTitle: TowersTypes;
  switchers: ITabSwitchers;
}

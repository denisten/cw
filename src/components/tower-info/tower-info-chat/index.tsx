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
import {
  calculateMessageDelay,
  checkLastFailedMessage,
  isChatEnded,
  isLastAnswerBelongToUser,
  scrollToBottom,
} from '../../../utils/chat-utils';

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

const extraDelay = 700;

export const TowerInfoChat: React.FC<ITowerInfoChat> = ({
  towerTitle,
  switchers,
}) => {
  const { userCoupons } = useStore(UserMarketStore);
  const tasks = useStore(TasksStore);
  const { blockId, taskId, actions, messages, ended } = useStore(ChatStore)[
    towerTitle
  ];

  const [openCouponModal, setOpenCouponModal] = useState(false);
  const [responseStatus, setResponseStatus] = useState(PromiseStatus.PENDING);
  const [savedMessages, setSavedMessages] = useState<IMessage[]>([]);
  const [failedTask, setFailedTask] = useState(false);
  const timeOutRef = useRef(0);

  const currentTask = findSubtask(taskId) || tasks.find(el => el.id === taskId);
  const { count: couponReplaceCount } = userCoupons[CouponTypes.COUPON_REPLACE],
    { count: couponSkipCount } = userCoupons[CouponTypes.COUPON_SKIP];

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const haveMessages = messages && messages.length > 0;
  const responseResolved = responseStatus === PromiseStatus.RESOLVED;
  const showCouponInterfaceWhenTaskIsFailed = ended && failedTask;
  const { volume } = useStore(SettingsStore).sound;

  const { play: newMessagePlay } = useAudio(newMessage, false);

  const wantedTaskStatuses = new Set([
    TaskTypes.PRODUCT_QUIZ,
    TaskTypes.RELATED_QUIZ,
  ]);

  const sendAnswerId = async (actionId: number) => {
    if (responseResolved && currentTask) {
      setResponseStatus(PromiseStatus.PENDING);
      const {
        data: { ended },
      } = await consumeUserTaskAction({
        taskId: currentTask.id,
        blockId,
        actionId,
        towerTitle,
      });

      if (ended) {
        if (wantedTaskStatuses.has(currentTask.taskTypeSlug)) {
          await chatEndedHandler(taskId, towerTitle);
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
    scrollToBottom(chatContainerRef);
    return () => {
      setHideTowerInfo(false);
    };
  }, [towerTitle]);

  const checkLastMessage = (messages: IMessage[]) => {
    if (isChatEnded(messages) || isLastAnswerBelongToUser(messages)) {
      setResponseStatus(PromiseStatus.RESOLVED);
      setSavedMessages(messages);
      return true;
    }
  };

  useEffect(() => {
    if (!messages || checkLastMessage(messages)) return;
    timeOutRef.current && clearTimeout(timeOutRef.current);
    const lastUserMessageIndex = messages.reduce(
      (acc, message, index) =>
        message.direction === Sender.FRONTEND ? (acc = index) : acc,
      0
    );
    if (!lastUserMessageIndex) {
      setSavedMessages(messages);
      setResponseStatus(PromiseStatus.RESOLVED);
    } else {
      setResponseStatus(PromiseStatus.PENDING);
      const botLastMessages = messages.slice(
        lastUserMessageIndex + 1,
        messages.length
      );
      setSavedMessages(messages.slice(0, lastUserMessageIndex + 1));
      const isLast = (idx: number) => botLastMessages.length - 1 === idx;

      botLastMessages.forEach((msg, idx) => {
        timeOutRef.current = setTimeout(() => {
          setSavedMessages(() => {
            isLast(idx) && setResponseStatus(PromiseStatus.RESOLVED);
            return [...messages.slice(0, lastUserMessageIndex + 1 + idx), msg];
          });
        }, calculateMessageDelay(msg.text.length) + extraDelay * (idx + 1));
      });
    }
  }, [messages]);

  useEffect(() => {
    scrollToBottom(chatContainerRef);
    checkLastFailedMessage(messages)
      ? setFailedTask(true)
      : setFailedTask(false);
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

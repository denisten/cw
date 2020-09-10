import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
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
import { Bubble } from '../../../UI/bubble';
import { ChatPreview } from '../../../UI/chat-preview';
import { hideMarker, setMarker } from '../../../effector/towers-marker/events';
import { ChatButtons } from '../../../UI/chat-buttons';
import { ChatAvatar } from '../../../UI/chat-avatar';
import { MarkerTypes } from '../../markers';
import { useStore } from 'effector-react';
import { setHideTowerInfo } from '../../../effector/tower-info-modal-store/events';
import { ModalWindow } from '../../modal-window';
import { chatEndedHandler } from '../../../utils/chat-ended-handler';
import { checkChatSession } from '../../../utils/check-chat-session';
import { setCurrentTaskStatus } from '../../../effector/tasks-store/events';
import newMessage from '../../../sound/newMessage.wav';
import { SettingsStore } from '../../../effector/settings/store';
import { useAudio } from '../../../hooks/use-sound';
import { usePlaySoundIf } from '../../../hooks/use-play-sound-if';
import { MissionsStore } from '../../../effector/missions-store/store';
import { writingAnimation } from './keyframes';
import { IDisplayFlag } from '../../root-component';
import { TaskTypes } from '../../../app';

const ChatWrapper = styled.div`
  width: 100%;
  height: 394px;
  box-sizing: border-box;
  overflow: auto;
  border-bottom: solid 1px #e2e5eb;
  position: relative;
  max-height: 460px;
  transition: 0.5s;
  padding-right: 14px;
  scroll-behavior: smooth;

  &::before {
    content: '';
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    display: block;
    background-image: linear-gradient(to top, rgba(243, 243, 243, 0), #fbfbfb);
    z-index: 2;
  }

  &::after {
    content: '';
    position: sticky;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    display: block;
    background-image: linear-gradient(
      to bottom,
      rgba(243, 243, 243, 0),
      #f2f2f2
    );
    z-index: 2;
  }
`;

const Writing = styled.div`
  font-size: 36px;
  animation: ${writingAnimation} 0.5s infinite;
  letter-spacing: 6px;
  margin-left: 10px;
  line-height: 1.1;
`;

const BotIsWritingWrap = styled.div<IDisplayFlag>`
  width: 100%;
  position: sticky;
  bottom: 0;
  left: 0;
  z-index: 3;
  display: ${props => (props.displayFlag ? 'flex' : 'none')};
  align-items: flex-end;
`;

const MessageRow = styled.div<IMessageRow>`
  display: flex;
  height: auto;
  flex-direction: ${props =>
    props.sender === Sender.BACKEND ? 'row' : 'row-reverse'};
  align-items: flex-end;
  margin-bottom: 24px;
`;

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
const lettersPerSecond = 100,
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
enum PromiseStatus {
  PENDING = 'pending',
  RESOLVED = 'resolved',
}

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

  const chatContainer = useRef<HTMLDivElement>(null);

  const haveMessages = messages && messages.length > 0;

  const sendAnswerId = async (actionId: number) => {
    if (responseStatus === PromiseStatus.RESOLVED && currentTask) {
      setResponseStatus(PromiseStatus.PENDING);
      const response = await consumeUserTaskAction({
        taskId: currentTask.id,
        blockId,
        actionId,
        towerTitle,
      });

      if (response.data.ended) {
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
  const {
    sound: { volume },
  } = useStore(SettingsStore);
  const { play: newMessagePlay } = useAudio(newMessage, false, volume);
  usePlaySoundIf<IMessage[]>(
    haveMessages && !!volume,
    newMessagePlay,
    messages
  );

  useEffect(() => {
    setHideTowerInfo(true);
  }, []);

  const scrollToBottom = () =>
    chatContainer.current &&
    chatContainer.current.scrollTo(0, chatContainer.current.scrollHeight);

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
    let lettersCount = 0;

    const newMessages = messages.slice(savedMessages.length, messages.length);
    const myNewMessages = newMessages.filter(
      el => el.direction === Sender.FRONTEND
    );
    const botsNewMessages = newMessages.filter(
      el => el.direction === Sender.BACKEND
    );

    if (!savedMessages.length) {
      if (myNewMessages.length) {
        setSavedMessages(messages);
      } else {
        setResponseStatus(PromiseStatus.PENDING);
        let delay = 0;
        botsNewMessages.forEach((el, idx) => {
          lettersCount = el.text.length;
          delay += calculateMessageDelay(lettersCount);
          setTimeout(() => {
            setSavedMessages(prevState => [...prevState, el]);
            if (idx === botsNewMessages.length - 1)
              setResponseStatus(PromiseStatus.RESOLVED);
          }, delay);
        });
      }
      return;
    } else {
      setSavedMessages(prevState => [...prevState, ...myNewMessages]);
      botsNewMessages.forEach(el => (lettersCount += el.text.length));
      setTimeout(() => {
        setResponseStatus(PromiseStatus.RESOLVED);
        setSavedMessages(prevState => [...prevState, ...botsNewMessages]);
      }, calculateMessageDelay(lettersCount));
    }
  }, [messages]);

  const checkLastMessage = () =>
    messages && messages[messages.length - 1]?.failedTask;

  useEffect(() => {
    scrollToBottom();
    checkLastMessage() ? setFailedTask(true) : setFailedTask(false);
  }, [savedMessages, messages]);

  const BotWriting = (
    <BotIsWritingWrap displayFlag={true}>
      <ChatAvatar
        sender={Sender.BACKEND}
        userAvatar=""
        towerTitle={towerTitle}
      />
      <Writing>...</Writing>
    </BotIsWritingWrap>
  );
  const chatWrapperContent = haveMessages ? (
    <ChatWrapper ref={chatContainer}>
      {savedMessages.map(({ direction, text }, idx) => (
        <MessageRow key={idx} sender={direction}>
          <ChatAvatar
            sender={direction}
            userAvatar=""
            towerTitle={towerTitle}
          />
          <Bubble sender={direction} text={text} botName="Помощник" />
        </MessageRow>
      ))}
      {responseStatus === PromiseStatus.PENDING && BotWriting}
    </ChatWrapper>
  ) : (
    <ChatPreview />
  );

  return (
    <>
      {chatWrapperContent}

      <ChatButtons
        haveCoupon={showCouponInterfaceWhenTaskIsFailed}
        couponCount={couponReplaceCount + couponSkipCount}
        actions={actions}
        callback={sendAnswerId}
        couponCallback={() => setOpenCouponModal(true)}
      />

      <ModalWindow
        {...couponModalConfig}
        displayFlag={openCouponModal}
        cancelHandler={() => setOpenCouponModal(false)}
        id={taskId}
        towerTitle={towerTitle}
      />
    </>
  );
};

interface ITowerInfoChat {
  towerTitle: TowersTypes;
  switchers: ITabSwitchers;
}

interface IMessageRow {
  sender?: Sender;
}

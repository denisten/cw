import React, { memo, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { IDisplayFlag } from '../../skip-tutorial';
import { Sender } from '../../../api/tasks-api/session';
import {
  ITask,
  TasksStore,
  TaskStatuses,
} from '../../../effector/task-store/store';
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
import { TypeOfMarkers } from '../../markers';
import { useStore } from 'effector-react';
import { setHideTowerInfo } from '../../../effector/tower-info-modal-store/events';
import { TasksType } from '../../menu/menu-tasks';
import { ModalWindow } from '../../modal-window';
import { chatEndedHandler } from '../../../utils/chat-ended-handler';
import { checkChatSession } from '../../../utils/check-chat-session';
import { setCurrentTaskStatus } from '../../../effector/task-store/events';

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

const writing = keyframes`
    0% {
        opacity: .2;
    }

    100% {
        opacity: 1;
    }
`;

const Writing = styled.div`
  font-size: 36px;
  animation: ${writing} 0.5s infinite;
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

let currentMission: null | ITask;

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

export const TowerInfoChat: React.FC<ITowerInfoChat> = memo(
  ({ towerTitle, switchers }) => {
    const chatContainer = useRef<HTMLDivElement>(null);
    const { blockId, taskId, actions, messages, ended } = useStore(ChatStore)[
      towerTitle
    ];
    const missions = useStore(TasksStore);
    const [openCouponModal, setOpenCouponModal] = useState(false);
    const [pendingOfResponse, setPendingOfResponse] = useState(false);
    const { userCoupons } = useStore(UserMarketStore);
    const { count } = userCoupons[CouponTypes.COUPON_REPLACE];

    const currentTaskIndex = missions.findIndex(el => {
      if (el?.task?.content?.product?.slug)
        return (
          el.status !== TaskStatuses.CREATED &&
          el.task.content.product.slug === towerTitle
        );
    });

    try {
      currentMission = missions[currentTaskIndex];
    } catch (e) {
      currentMission = null;
    }

    const checkCouponAvailability =
      currentMission?.task.content.taskType.slug !== TasksType.INFORMATIONAL &&
      (userCoupons[CouponTypes.COUPON_REPLACE].count > 0 ||
        userCoupons[CouponTypes.COUPON_SKIP].count > 0);

    const haveMessages = messages && messages.length > 0;

    const sendAnswerId = async (actionId: number) => {
      if (currentMission) {
        if (currentTaskIndex !== -1 && !pendingOfResponse) {
          setPendingOfResponse(true);
          const response = await consumeUserTaskAction({
            taskId: currentMission.id,
            blockId,
            actionId,
            towerTitle,
          });
          setPendingOfResponse(false);
          if (response.data.ended) {
            if (
              currentMission.task.content.taskType.slug ===
                TasksType.PRODUCT_QUIZ ||
              currentMission.task.content.taskType.slug ===
                TasksType.RELATED_QUIZ
            ) {
              chatEndedHandler(taskId, towerTitle);
            } else {
              setCurrentTaskStatus({ taskId, status: TaskStatuses.DONE });
              setMarker({
                towerTitle,
                type: TypeOfMarkers.SUCCESS,
              });
              switchers.openTasksTab();
            }
            hideMarker({ towerTitle, type: TypeOfMarkers.ACTIVE_TASK });
          }
        }
      }
    };

    useEffect(() => {
      setHideTowerInfo(true);
    }, []);

    useEffect(() => {
      checkChatSession(currentTaskIndex, missions, taskId, towerTitle);
      return () => {
        setHideTowerInfo(false);
      };
    }, [towerTitle]);

    useEffect(() => {
      if (chatContainer.current) {
        chatContainer.current.scrollTo(0, chatContainer.current.scrollHeight);
      }
    }, [messages]);

    const chatWrapperContent = haveMessages ? (
      <ChatWrapper ref={chatContainer}>
        {messages.map((item, idx) => (
          <MessageRow key={idx} sender={item.direction}>
            <ChatAvatar
              sender={item.direction}
              userAvatar=""
              towerTitle={towerTitle}
            />
            <Bubble
              sender={item.direction}
              text={item.text}
              botName="Имя бота"
            />
          </MessageRow>
        ))}
        <BotIsWritingWrap displayFlag={pendingOfResponse}>
          <ChatAvatar
            sender={Sender.BACKEND}
            userAvatar=""
            towerTitle={towerTitle}
          />
          <Writing>...</Writing>
        </BotIsWritingWrap>
      </ChatWrapper>
    ) : (
      <ChatPreview />
    );

    return (
      <>
        {chatWrapperContent}
        {!ended && (
          <ChatButtons
            haveCoupon={checkCouponAvailability}
            couponCount={count}
            actions={actions}
            callback={sendAnswerId}
            couponCallback={() => setOpenCouponModal(true)}
          />
        )}
        <ModalWindow
          {...couponModalConfig}
          displayFlag={openCouponModal}
          cancelHandler={() => setOpenCouponModal(false)}
          id={taskId}
          towerTitle={towerTitle}
        />
      </>
    );
  }
);

interface ITowerInfoChat {
  towerTitle: TowersTypes;
  switchers: ITabSwitchers;
}

interface IMessageRow {
  sender?: Sender;
}

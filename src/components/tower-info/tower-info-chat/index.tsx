import React, { memo, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { IDisplayFlag } from '../../skip-tutorial';
import { Sender } from '../../../api/tasks-api/session';
import { ITask, TasksStore } from '../../../effector/missions-store/store';
import {
  chatTaskSession,
  consumeUserTaskAction,
  pushBotMessageToCurrentChat,
} from '../../../effector/chat/events';
import { TowersTypes } from '../../../effector/towers-progress/store';
import { ITabSwitchers } from '../index';
import {
  getResult,
  setCurrentTaskStatus,
} from '../../../effector/missions-store/events';
import { CouponTypes, UserMarketStore } from '../../../effector/coupons/store';
import { couponHandler } from '../../../utils/coupon-handler';
import { ChatStore } from '../../../effector/chat/store';
import { Bubble } from '../../../UI/bubble';
import { ChatPreview } from '../../../UI/chat-preview';

import { ModalWindow } from '../../modal-window';
import { hideMarker, setMarker } from '../../../effector/towers-marker/events';
import { ChatButtons } from '../../../UI/chat-buttons';
import { ChatAvatar } from '../../../UI/chat-avatar';
import { TypeOfMarkers } from '../../markers';
import { useStore } from 'effector-react';
import { setHideTowerInfo } from '../../../effector/tower-info-modal-store/events';
import { TasksType } from '../../menu/menu-tasks';
import { TaskStatuses } from '../../../api/enums';

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
  title: 'Вы уверены, что хотите использовать купон?',
  minorText: 'Если вы примените купон, отменить действие будет не возможно.',
  popUpStyles: {
    width: 487,
    padding: '68px 80px',
  },
  submitButtonText: 'Да, использовать',
  cancelButtonText: 'Нет, не хочу',
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
              const data = await getResult(taskId);
              if (data.quizResult.success) {
                setMarker({
                  towerTitle,
                  type: TypeOfMarkers.SUCCESS,
                });
                const resultObject = {
                  message: {
                    direction: Sender.BACKEND,
                    text: `Молодец! Задание выполнено!
                    Правильных ответов ${data.quizResult.correct} из ${data
                      .quizResult.correct + data.quizResult.incorrect}.
                    В заданиях тебя ждёт награда.`,
                  },
                  towerTitle,
                };
                pushBotMessageToCurrentChat(resultObject);
              } else {
                const resultObject = {
                  message: {
                    direction: Sender.BACKEND,
                    text: `Увы! Задание не выполнено.
                  Правильных ответов ${data.quizResult.correct} из ${data
                      .quizResult.correct + data.quizResult.incorrect}. 
                  Попробуй еще раз или воспользуйся купоном во вкладке "Задания".`,
                  },
                  towerTitle,
                };
                pushBotMessageToCurrentChat(resultObject);
              }
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
      if (
        currentTaskIndex !== -1 &&
        missions[currentTaskIndex].task.content.taskType.slug !==
          TasksType.COSMETIC &&
        missions[currentTaskIndex].status !== TaskStatuses.DONE &&
        missions[currentTaskIndex].status !== TaskStatuses.CREATED &&
        missions[currentTaskIndex].status !== TaskStatuses.REJECTED
      ) {
        chatTaskSession({ id: taskId, towerTitle });
      } else if (
        currentTaskIndex !== -1 &&
        missions[currentTaskIndex].task.content.taskType.slug !==
          TasksType.COSMETIC &&
        missions[currentTaskIndex].status === TaskStatuses.REJECTED
      ) {
        chatTaskSession({ id: taskId, towerTitle, retry: false });
      }
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
            haveCoupon={false}
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
          submitHandler={() => {
            couponHandler(currentMission?.id, count, towerTitle, switchers);
            setOpenCouponModal(false);
          }}
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

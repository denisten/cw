import React, { memo, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { setHideTowerInfo } from '../../effector/app-condition/events';
import { Bubble } from '../../UI/bubble';
import { ChatButtons } from '../../UI/chat-buttons';
import { ChatAvatar } from '../../UI/chat-avatar';
import { useStore } from 'effector-react';
import { TaskMessagesStore } from '../../effector/task-messages/store';
import { Sender } from '../../api/tasks/session';
import {
  chatTaskSession,
  consumeUserTaskAction,
} from '../../effector/task-messages/events';
import { TowersTypes } from '../../effector/towers-progress/store';
import { ITask, MissionsStore } from '../../effector/missions-store/store';
import { TaskStatuses } from '../../api/tasks/get-tasks';
import { TasksType } from '../tasks';
import { ITabSwitchers } from '../tower-info';
import {
  getResult,
  setCurrentTaskStatus,
} from '../../effector/missions-store/events';
import { hideMarker } from '../../effector/towers-marker/events';
import { TypeOfMarkers } from '../markers';
import { ModalWindow } from '../modal-window';
import { UserStore, CouponTypes } from '../../effector/store/store';
import { activateCoupon } from '../../api/activate-coupon';
import { responseStates } from '../../constants';
import { coughtError } from '../../effector/error-boundary-store/events';

const ChatWrapper = styled.div<IFullSize>`
  width: 100%;
  height: ${props => (props.fullSize ? 'auto' : '344px')};
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

const MessageRow = styled.div<{ sender?: Sender }>`
  display: flex;
  height: auto;
  flex-direction: ${props =>
    props.sender === Sender.BACKEND ? 'row' : 'row-reverse'};
  align-items: flex-end;
  margin-bottom: 24px;
`;

const START_HIDE_POS = 200;
const yScrollValue = 344;

let currentMission: null | ITask;

const couponModalConfig = {
  title: 'Вы уверены, что хотите использовать купон?',
  minorText: 'Если вы примените купон, отменить действие будет не возможно.',
  popUpStyles: {
    width: 487,
    padding: '68px 80px',
  },
  submitButtonText: 'Да, использовать',
  cancellButtonText: 'Нет, не хочу',
};

export const TowerInfoChat: React.FC<ITowerInfoChat> = memo(
  ({ hideContent, towerTitle, switchers }) => {
    const chatContainer = useRef<HTMLDivElement>(null);
    const {
      [towerTitle]: { masterMessageId, taskId, actions, messages, ended },
    } = useStore(TaskMessagesStore);
    const missions = useStore(MissionsStore);

    const { userCoupons } = useStore(UserStore);
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
    const sendAnswerId = async (actionId: number) => {
      if (currentMission) {
        if (currentTaskIndex !== -1) {
          const response = await consumeUserTaskAction({
            taskId: currentMission.id,
            messageId: masterMessageId,
            actionId,
            towerTitle,
          });
          if (response.data.ended) {
            if (
              currentMission.task.content.taskType.slug ===
                TasksType.PRODUCT_QUIZ ||
              currentMission.task.content.taskType.slug ===
                TasksType.RELATED_QUIZ
            ) {
              getResult(taskId);
            } else {
              setCurrentTaskStatus({ taskId, status: TaskStatuses.DONE });
            }
            hideMarker({ towerTitle, type: TypeOfMarkers.ACTIVE_TASK });
            switchers.openTasksTab();
          }
        }
      }
    };

    const useCoupon = async (taskId?: number) => {
      if (taskId) {
        const response = await activateCoupon(
          CouponTypes.COUPON_REPLACE,
          taskId
        );
        if (response.state === responseStates.SUCCESS) {
          await getResult(taskId);
        } else {
          coughtError({
            text: response.data.msg,
          });
        }
      }
    };

    const chatWheelHandler = () => {
      if (chatContainer.current) {
        if (chatContainer.current.scrollTop > START_HIDE_POS && !hideContent) {
          setHideTowerInfo(true);
        } else if (chatContainer.current.scrollTop === 0 && hideContent) {
          setHideTowerInfo(false);
        }
      }
    };

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
      }
      return () => {
        setHideTowerInfo(false);
      };
    }, [towerTitle]);

    useEffect(() => {
      if (chatContainer.current) {
        chatContainer.current.scrollTo(0, yScrollValue);
      }
    }, [messages]);

    return (
      <>
        <ChatWrapper
          onScroll={chatWheelHandler}
          fullSize={hideContent}
          ref={chatContainer}
        >
          {messages &&
            messages.map((item, idx) => (
              <MessageRow key={idx} sender={item.direction}>
                <ChatAvatar
                  sender={item.direction}
                  userAvatar={''}
                  towerTitle={towerTitle}
                />
                <Bubble
                  sender={item.direction}
                  text={item.text}
                  botName="Имя бота"
                />
              </MessageRow>
            ))}
        </ChatWrapper>
        <ChatButtons
          haveCoupon={!!count && !ended}
          couponCount={count}
          actions={actions}
          callback={sendAnswerId}
          useCouponCallback={() => useCoupon(currentMission?.id)}
        ></ChatButtons>

        <ModalWindow {...couponModalConfig} displayFlag={false}></ModalWindow>
      </>
    );
  }
);

interface ITowerInfoChat {
  hideContent: boolean;
  towerTitle: TowersTypes;
  switchers: ITabSwitchers;
}

export interface IFullSize {
  fullSize: boolean;
}

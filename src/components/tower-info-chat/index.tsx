import React, { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { setHideTowerInfo } from '../../effector/app-condition/events';
import { Bubble } from '../../UI/bubble';
import { ChatButtons } from '../../UI/chat-buttons';
import { ChatAvatar } from '../../UI/chat-avatar';
import { AdvancedScrollbar } from '../../UI/advanced-scrollbar';
import { AdvanceScrollBarAttr } from '../../utils/handle-scroll';
import { useStore } from 'effector-react';
import { TaskMessagesStore } from '../../effector/task-messages/store';
import { Sender } from '../../api/tasks/session';
import {
  chatTaskSession,
  consumeUserTaskAction,
} from '../../effector/task-messages/events';
import { TowersTypes } from '../../effector/towers-progress/store';
import {
  ITask,
  MissionsStore,
  TaskStatuses,
} from '../../effector/missions-store/store';
import { TasksType } from '../tasks';
import { takeReward, verifyTask } from '../../effector/missions-store/events';

const ChatWrapper = styled(AdvancedScrollbar)<{ foolSize: boolean }>`
  width: 100%;
  height: ${props => (props.foolSize ? 'auto' : '344px')};
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

// const START_HIDE_POS = 200;

export const TowerInfoChat: React.FC<ITowerInfoChat> = memo(
  ({ hideContent, towerTitle }) => {
    const chatContainer = useRef<HTMLDivElement>(null);
    const {
      [towerTitle]: { messages, actions, masterMessageId, ended },
    } = useStore(TaskMessagesStore);
    // console.log({ messages, actions, towerTitle });
    const [currentMission, setCurrentMission] = useState<ITask | null>(null);
    const missions = useStore(MissionsStore);

    useEffect(() => {
      missions.map(el => {
        if (
          el.task.content.product.slug === towerTitle &&
          el.task.content.taskType.slug !== TasksType.COSMETIC
        ) {
          setCurrentMission(el);
          chatTaskSession({ id: el.id, towerTitle });
          return;
        }
      });
      return () => {
        setHideTowerInfo(false);
      };
    }, []);

    useEffect(() => {
      if (chatContainer.current) {
        // chatContainer.current.scrollTo(0, 344);
      }
    }, [messages]);

    const sendAnswerId = async (actionId: number) => {
      if (currentMission) {
        if (!ended)
          await consumeUserTaskAction({
            taskId: currentMission.id,
            messageId: masterMessageId,
            actionId,
            towerTitle,
          });
        else if (
          // выпилим если пользователю надо будет самому кликать по статусам
          currentMission.status !== TaskStatuses.REWARDED &&
          currentMission.status !== TaskStatuses.DONE
        ) {
          await verifyTask(currentMission.id);
          await takeReward(currentMission.id);
        }
      }
    };

    // const chatWheelHandler = () => {
    //   if (chatContainer.current) {
    //     if (chatContainer.current.scrollTop > START_HIDE_POS && !hideContent) {
    //       setHideTowerInfo(true);
    //     } else if (chatContainer.current.scrollTop === 0 && hideContent) {
    //       setHideTowerInfo(false);
    //     }
    //   }
    // };

    return (
      <>
        <ChatWrapper
          data-type={AdvanceScrollBarAttr.ADVANCE_SCROLLBAR}
          // onScroll={chatWheelHandler}
          foolSize={hideContent}
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
        <ChatButtons actions={actions} callback={sendAnswerId} />
      </>
    );
  }
);

interface ITowerInfoChat {
  hideContent: boolean;
  towerTitle: TowersTypes;
}

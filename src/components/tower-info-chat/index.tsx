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
import { takeReward, verifyTask } from '../../effector/missions-store/events';

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

export const TowerInfoChat: React.FC<ITowerInfoChat> = memo(
  ({ hideContent, towerTitle }) => {
    const chatContainer = useRef<HTMLDivElement>(null);
    const {
      [towerTitle]: { messages, actions, masterMessageId, ended, taskId },
    } = useStore(TaskMessagesStore);
    const missions = useStore(MissionsStore);
    const currentTaskIndex = missions.findIndex(el => {
      return el.id === taskId;
    });

    try {
      currentMission = missions[currentTaskIndex];
    } catch (e) {
      currentMission = null;
    }

    const sendAnswerId = async (actionId: number) => {
      if (currentMission) {
        if (!ended)
          await consumeUserTaskAction({
            taskId: currentMission.id,
            messageId: masterMessageId,
            actionId,
            towerTitle,
          });
        else {
          await verifyTask(currentMission.id);
          await takeReward(currentMission.id);
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
      if (taskId && messages.length === 0)
        chatTaskSession({ id: taskId, towerTitle });
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
        <ChatButtons actions={actions} callback={sendAnswerId} />
      </>
    );
  }
);

interface ITowerInfoChat {
  hideContent: boolean;
  towerTitle: TowersTypes;
}

export interface IFullSize {
  fullSize: boolean;
}

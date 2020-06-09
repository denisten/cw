import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { setHideTowerInfo } from '../../effector/app-condition/events';
import { Bubble } from '../../UI/bubble';
import { ChatButtons } from '../../UI/chat-buttons';
import { ChatAvatar } from '../../UI/chat-avatar';
import { AdvancedScrollbar } from '../../UI/advanced-scrollbar';
import { AdvanceScrollBarAttr } from '../../utils/handle-scroll';
import { useStore } from 'effector-react';
import { TaskMessagesStore } from '../../effector/task-messages/store';
import { MessagesDirection } from '../../api/tasks/session';
import {
  chatTaskSession,
  consumeUserTaskAction,
} from '../../effector/task-messages/events';
import { TowersTypes } from '../../effector/towers-progress/store';
import { MissionsStore } from '../../effector/missions-store/store';
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

const MessageRow = styled.div<{ direction?: string }>`
  display: flex;
  height: auto;
  flex-direction: ${props =>
    props.direction === MessagesDirection.INCOMING ? 'row' : 'row-reverse'};
  align-items: flex-end;
  margin-bottom: 24px;
`;

const ChatConfig: IChatConfig = {
  systemBotAvatar: '',
  userAvatar: '',
  messages: [
    {
      id: 1,
      text: 'Привет, я библиотекарь',
      type: 'system',
      botName: 'Библиотекарь',
    },
    {
      id: 2,
      text: 'Дай мне книжечку',
      type: 'user',
    },
    {
      id: 3,
      text: 'Привет, я библиотекарь',
      type: 'system',
      botName: 'Библиотекарь',
    },
    {
      id: 4,
      text:
        'Дай мне книжечку почитать текст большой большой большой должен бабл растянуть как надо',
      type: 'user',
    },
    {
      id: 5,
      text: 'Привет, я библиотекарь',
      type: 'system',
      botName: 'Библиотекарь',
    },
    {
      id: 6,
      text: 'Дай мне книжечку',
      type: 'user',
    },
    {
      id: 7,
      text: 'Привет, я библиотекарь',
      type: 'system',
      botName: 'Библиотекарь',
    },
    {
      id: 8,
      text: 'Дай мне книжечку',
      type: 'user',
    },
    {
      id: 9,
      text: 'Привет, я библиотекарь',
      type: 'system',
      botName: 'Библиотекарь',
    },
    {
      id: 10,
      text: 'Дай мне книжечку',
      type: 'user',
    },
    {
      id: 11,
      text: 'Привет, я библиотекарь',
      type: 'system',
      botName: 'Библиотекарь',
    },
    {
      id: 12,
      text: 'Дай мне книжечку',
      type: 'user',
    },
    {
      id: 13,
      text: 'Привет, я библиотекарь',
      type: 'system',
      botName: 'Библиотекарь',
    },
    {
      id: 14,
      text: 'Дай мне книжечку',
      type: 'user',
    },
  ],
  buttons: [
    { title: 'Ничего себе, расскажи подробнее!', answerId: 12 },
    { title: 'Ясно понятно', answerId: 14 },
    { title: 'Пойду поем', answerId: 16 },
  ],
};

const START_HIDE_POS = 200;

export const TowerInfoChat: React.FC<ITowerInfoChat> = ({
  hideContent,
  towerTitle,
}) => {
  const chatContainer = useRef<HTMLDivElement | null>(null);
  const { messages, actions, masterMessageId, ended } = useStore(
    TaskMessagesStore
  );
  const [taskId, setTaskId] = useState(0);
  const missions = useStore(MissionsStore);

  useEffect(() => {
    // chatTaskSession('');
    missions.map(el => {
      if (
        el.task.content.product.slug === towerTitle &&
        el.task.content.taskType.slug === TasksType.INFORMATIONAL
      ) {
        chatTaskSession(el.id);
        setTaskId(el.id);
        return;
      }
    });
    return () => {
      setHideTowerInfo(false);
    };
  }, []);

  const sendAnswerId = async (actionId: number) => {
    if (!ended)
      consumeUserTaskAction({ taskId, messageId: masterMessageId, actionId });
    else {
      await verifyTask(taskId);
      await takeReward(taskId);
    }
    // send user answer
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

  return (
    <>
      <ChatWrapper
        data-type={AdvanceScrollBarAttr.ADVANCE_SCROLLBAR}
        onScroll={chatWheelHandler}
        foolSize={hideContent}
        ref={chatContainer}
      >
        {messages.map((item, idx) => (
          <MessageRow key={idx} direction={item.direction}>
            <ChatAvatar //тут аватарка отправителя
              // тут ключ и тип
              type={item.direction}
              systemBotAvatar={ChatConfig.systemBotAvatar}
              userAvatar={ChatConfig.userAvatar}
            />
            <Bubble
              direction={item.direction}
              text={item.text}
              botName="Имя бота"
            />
          </MessageRow>
        ))}
      </ChatWrapper>
      <ChatButtons actions={actions} callback={sendAnswerId} />
    </>
  );
};

interface IChatConfig {
  systemBotAvatar?: string;
  userAvatar?: string;
  messages: IMessages[];
  buttons: { title: string; answerId: number }[];
}

interface ITowerInfoChat {
  hideContent: boolean;
  towerTitle: TowersTypes;
}

interface IMessages {
  id: number;
  text: string;
  type: string;
  botName?: string;
}

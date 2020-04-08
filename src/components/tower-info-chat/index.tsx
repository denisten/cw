import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { setHideTowerInfo } from '../../effector/app-condition/events';
import { Bubble } from '../../UI/bubble';
import { ChatButtons } from '../../UI/chat-buttons';
import { ChatAvatar } from '../../UI/chat-avatar';

export enum MessageType {
  SYSTEM = 'system',
  USER = 'user',
}

const ChatWrapper = styled.div<{ foolSize: boolean }>`
  width: 100%;
  height: ${props => (props.foolSize ? 'auto' : '344px')};
  box-sizing: border-box;
  overflow: auto;
  border-bottom: solid 1px #e2e5eb;
  position: relative;
  max-height: 460px;
  transition: 0.5s;

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

const MessageRow = styled.div<{ type?: string }>`
  display: flex;
  height: auto;
  flex-direction: ${props =>
    props.type === MessageType.SYSTEM ? 'row' : 'row-reverse'};
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

export const TowerInfoChat: React.FC<ITowerInfoChat> = ({ hideContent }) => {
  const chatContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      setHideTowerInfo(false);
    };
  }, []);

  const sendAnswerId = () => {
    // do somethink id
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
        onScroll={chatWheelHandler}
        foolSize={hideContent}
        ref={chatContainer}
      >
        {ChatConfig.messages.map(item => (
          <MessageRow key={item.id} type={item.type}>
            <ChatAvatar
              type={item.type}
              systemBotAvatar={ChatConfig.systemBotAvatar}
              userAvatar={ChatConfig.userAvatar}
            />
            <Bubble type={item.type} text={item.text} botName={item.botName} />
          </MessageRow>
        ))}
      </ChatWrapper>
      <ChatButtons
        buttonsCollection={ChatConfig.buttons}
        callback={sendAnswerId}
      />
    </>
  );
};

interface IChatConfig {
  systemBotAvatar?: string;
  userAvatar?: string;
  messages: Imessages[];
  buttons: { title: string; answerId: number }[];
}

interface ITowerInfoChat {
  hideContent: boolean;
}

interface Imessages {
  id: number;
  text: string;
  type: string;
  botName?: string;
}

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import whiteCorner from './corner-white.svg';
import bCorner from './corner-b.svg';
import { setHideTowerInfo } from '../../effector/app-condition/events';

const ChatWrapper = styled.div<{ foolSize: boolean }>`
  width: 100%;
  height: ${props => (props.foolSize ? 'auto' : '344px')};
  box-sizing: border-box;
  overflow: auto;
  border-bottom: solid 1px #e2e5eb;
  position: relative;
  max-height: 460px;

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
`;

const MessageRow = styled.div<{ type?: string }>`
  display: flex;
  height: auto;
  flex-direction: ${props => (props.type === 'system' ? 'row' : 'row-reverse')};
  align-items: flex-end;
  margin-bottom: 24px;
`;

const Message = styled.div<{ type?: string }>`
  margin: ${props => (props.type === 'system' ? '0 0 0 8px' : '0 8px 0 0')};
  background-color: ${props => (props.type === 'system' ? 'white' : '#04B5D2')};
  border-radius: 4px;
  padding: ${props =>
    props.type === 'system' ? '12px 41px 12px 29px' : '22px 41px 22px 24px'};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 11px 0 #e2e5eb;
  position: relative;

  span {
    font-family: MTSSans;
    font-size: 16px;
    line-height: 1.25;
    color: ${props => (props.type === 'system' ? '#001424' : 'white')};
  }

  &::before {
    content: '';
    position: absolute;
    background: url(${whiteCorner}) no-repeat center;
    bottom: 0;
    left: -6px;
    width: 38px;
    height: 32px;
    display: ${props => (props.type === 'system' ? 'block' : 'none')};
  }

  &::after {
    content: '';
    position: absolute;
    background: url(${bCorner}) no-repeat center;
    bottom: 0;
    right: -6px;
    width: 38px;
    height: 32px;
    display: ${props => (props.type === 'user' ? 'block' : 'none')};
  }
`;

const BotName = styled.div`
  height: 20px;
  font-family: MTSSans;
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: #02adc9;
`;

const Avatar = styled.img`
  width: 51px;
  height: 51px;
  border-radius: 50%;
  background: red;
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
      text: 'Дай мне книжечку',
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

const Button = styled.div`
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 #bbc1c7;
  background-color: #04b5d2;
  padding: 4px 16px;
  margin: 0 12px 12px 0;
  color: white;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    box-shadow: 0 3px 6px 0 #bbc1c7;
  }
`;

const ButtonBody = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-shrink: 0;
`;

const START_HIDE_POS = 200;

export const TowerInfoChat: React.FC<ITowerInfoChat> = ({ hideContent }) => {
  const setAvatar = (messageType: string) => {
    if (messageType === 'system') {
      return ChatConfig.systemBotAvatar;
    } else {
      return ChatConfig.userAvatar;
    }
  };

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
            <Avatar src={setAvatar(item.type)}></Avatar>
            <Message type={item.type}>
              {item.type === 'system' && <BotName>{item.botName}</BotName>}
              <span>{item.text}</span>
            </Message>
          </MessageRow>
        ))}
      </ChatWrapper>
      <ButtonBody>
        {ChatConfig.buttons.map(button => (
          <Button key={button.answerId} onClick={() => sendAnswerId()}>
            {button.title}
          </Button>
        ))}
      </ButtonBody>
    </>
  );
};

interface IChatConfig {
  systemBotAvatar?: string;
  userAvatar?: string;
  messages: { id: number; text: string; type: string; botName?: string }[];
  buttons: { title: string; answerId: number }[];
}

interface ITowerInfoChat {
  hideContent: boolean;
}

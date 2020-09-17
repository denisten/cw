import React from 'react';
import { IModalWindow, ModalWindow } from '../../modal-window';
import { PromiseStatus } from './index';
import { ChatAvatar } from '../../../UI/chat-avatar';
import { IMessage, Sender } from '../../../api/tasks-api/session';
import { Bubble } from '../../../UI/bubble';
import { ChatPreview } from '../../../UI/chat-preview';
import { ChatButtons, IChatButtons } from '../../../UI/chat-buttons';
import styled from 'styled-components';
import { writingAnimation } from './keyframes';
import { TowersTypes } from '../../../effector/towers-progress/store';

const ChatWrapper = styled.div`
  width: 100%;
  height: 85%;
  box-sizing: border-box;
  overflow: auto;
  border-bottom: solid 1px #e2e5eb;
  position: relative;
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

const BotIsWritingWrap = styled.div`
  width: 100%;
  position: sticky;
  bottom: 0;
  left: 0;
  z-index: 3;
  display: flex;
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
export const TowerInfoChatLayout: React.FC<ITowerInfoChatLayout> = props => {
  const isResponseResolved = () =>
    props.responseStatus === PromiseStatus.RESOLVED;

  const BotWriting = (
    <BotIsWritingWrap>
      <ChatAvatar
        sender={Sender.BACKEND}
        userAvatar=""
        towerTitle={props.towerTitle}
      />
      <Writing>...</Writing>
    </BotIsWritingWrap>
  );

  const chatWrapperContent = props.haveMessages ? (
    <ChatWrapper ref={props.chatContainerRef}>
      {props.savedMessages.map(({ direction, text }, idx) => (
        <MessageRow key={idx} sender={direction}>
          <ChatAvatar
            sender={direction}
            userAvatar=""
            towerTitle={props.towerTitle}
          />
          <Bubble sender={direction} text={text} botName="Помощник" />
        </MessageRow>
      ))}
      {!isResponseResolved() && BotWriting}
    </ChatWrapper>
  ) : (
    <ChatPreview />
  );

  const chatButtons = isResponseResolved() && (
    <ChatButtons {...props.chatButtonsProps} />
  );

  return (
    <>
      {chatWrapperContent}
      {chatButtons}
      <ModalWindow {...props.modalWindowProps} />
    </>
  );
};

interface ITowerInfoChatLayout {
  towerTitle: TowersTypes;
  haveMessages: boolean;
  chatContainerRef: React.RefObject<HTMLDivElement>;
  savedMessages: IMessage[];
  responseStatus: PromiseStatus;
  chatButtonsProps: IChatButtons;
  modalWindowProps: IModalWindow;
}

interface IMessageRow {
  sender?: Sender;
}

import React from 'react';
import styled from 'styled-components';
import userDefault from './user-default.svg';
import botDefault from './bot-default.svg';
import { MessagesDirection } from '../../api/tasks/session';

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const ChatAvatar: React.FC<IChatAvatar> = ({
  direction,
  systemBotAvatar,
  userAvatar,
}) => {
  const setAvatar = () => {
    if (direction === MessagesDirection.OUT) {
      return systemBotAvatar || botDefault;
    } else {
      return userAvatar || userDefault;
    }
  };

  return <Avatar src={setAvatar()} />;
};

interface IChatAvatar {
  direction: MessagesDirection;
  systemBotAvatar: string | undefined;
  userAvatar: string | undefined;
}

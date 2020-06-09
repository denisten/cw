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
  type,
  systemBotAvatar,
  userAvatar,
}) => {
  const setAvatar = () => {
    if (type === MessagesDirection.INCOMING) {
      return systemBotAvatar || botDefault;
    } else {
      return userAvatar || userDefault;
    }
  };

  return <Avatar src={setAvatar()} />;
};

interface IChatAvatar {
  type: string;
  systemBotAvatar: string | undefined;
  userAvatar: string | undefined;
}

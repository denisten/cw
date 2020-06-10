import React from 'react';
import styled from 'styled-components';
import userDefault from './user-default.svg';
import botDefault from './bot-default.svg';
import { Sender } from '../../api/tasks/session';

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const ChatAvatar: React.FC<IChatAvatar> = ({
  sender,
  systemBotAvatar,
  userAvatar,
}) => {
  const setAvatar = () => {
    if (sender === Sender.BACKEND) {
      return systemBotAvatar || botDefault;
    } else {
      return userAvatar || userDefault;
    }
  };

  return <Avatar src={setAvatar()} />;
};

interface IChatAvatar {
  sender: Sender;
  systemBotAvatar: string | undefined;
  userAvatar: string | undefined;
}

import React from 'react';
import styled from 'styled-components';
import { MessageType } from '../../components/tower-info-chat';
import userDefault from './user-default.svg';
import botDefault from './bot-default.svg';

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
    if (type === MessageType.SYSTEM) {
      return systemBotAvatar || botDefault;
    } else {
      return userAvatar || userDefault;
    }
  };

  return <Avatar src={setAvatar()}></Avatar>;
};

interface IChatAvatar {
  type: string;
  systemBotAvatar: string | undefined;
  userAvatar: string | undefined;
}

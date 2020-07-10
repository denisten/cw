import React from 'react';
import challenge from './challenge.svg';
import missions from './missions.svg';
import nbo from './nbo.svg';
import cosmetics from './cosmetics.svg';
import energy from './energy.svg';
import coin from './coin.svg';
import login from './login.svg';
import chat from './chat.svg';
import { TasksType } from '../../components/tasks';

export enum TypeOfIcons {
  ENERGY = 'energy',
  COIN = 'coin',
  LOGIN = 'login',
  CHAT = 'chat',
}

const defaultStyle = {
  width: '34px',
  height: '34px',
};

export const Icon: React.FC<IIcon> = ({ style = defaultStyle, type }) => {
  const switchSrc = (type: TypeOfIcons | TasksType) => {
    switch (type) {
      case TypeOfIcons.CHAT:
        return chat;
      case TasksType.CHALLENGE:
      case TasksType.PRODUCT_QUIZ:
        return challenge;
      case TasksType.MISSION:
      case TasksType.RELATED_QUIZ:
        return missions;
      case TasksType.NBO:
      case TasksType.INFORMATIONAL:
        return nbo;
      case TasksType.COSMETIC:
        return cosmetics;
      case TypeOfIcons.ENERGY:
        return energy;
      case TypeOfIcons.COIN:
        return coin;
      case TasksType.TUTORIAL_TASK:
        return login;
      default:
        break;
    }
  };

  return <img style={style} loading="lazy" src={switchSrc(type)} alt="icon" />;
};

interface IIcon {
  style?: {
    width?: string;
    height?: string;
  };
  type: TypeOfIcons | TasksType;
}

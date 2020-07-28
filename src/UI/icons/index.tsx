import React from 'react';
import challenge from './challenge.svg';
import missions from './missions.svg';
import nbo from './nbo.svg';
import cosmetics from './cosmetics.svg';
import energy from './energy.svg';
import coin from './coin.svg';
import login from './login.svg';
import chat from './chat.svg';
import notice from './notice.svg';
import success from './success.svg';
import upgradeTower from './upgrade.svg';
import activeTask from './active-task.svg';
import coinMarker from './coinMarker.svg';
import play from './play.svg';
import replace from './replace.svg';
import skip from './skip.svg';
import { TasksType } from '../../components/menu/menu-tasks';
import { TypeOfMarkers } from '../../components/markers';
import { CouponTypes } from '../../effector/coupons/store';

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
  const switchSrc = (
    type: TypeOfIcons | TasksType | TypeOfMarkers | CouponTypes
  ) => {
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
      case TypeOfMarkers.TASK:
        return notice;
      case TypeOfMarkers.SUCCESS:
        return success;
      case TypeOfMarkers.TAKE_REWARD:
        return coinMarker;
      case TypeOfMarkers.ACTIVE_TASK:
        return activeTask;
      case TypeOfMarkers.UPGRADE_TOWER:
        return upgradeTower;
      case TypeOfMarkers.PLAY:
        return play;
      case CouponTypes.COUPON_REPLACE:
        return replace;
      case CouponTypes.COUPON_SKIP:
        return skip;

      default:
        break;
    }
  };

  return <img style={style} src={switchSrc(type)} alt="icon" />;
};

interface IIcon {
  style?: {
    width?: string;
    height?: string;
  };
  type: TypeOfIcons | TasksType | TypeOfMarkers | CouponTypes;
}

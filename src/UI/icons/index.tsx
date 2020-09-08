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
import enter from './enter.svg';
import promocode from './promo.svg';
import musicActive from './musicActive.svg';
import soundActive from './soundActive.svg';
import musicDisable from './musicDisable.svg';
import soundDisable from './soundDisable.svg';
import notAvailableTask from './not-available.svg';
import emptyPromocode from './empty-promocode.svg';
import { MarkerTypes } from '../../components/markers';
import { CouponTypes } from '../../effector/coupons/store';
import { SettingsType } from '../../effector/settings/store';
import { TaskStatuses } from '../../effector/tasks-store/store';
import { TaskTypes } from '../../app';

export enum TypeOfIcons {
  ENERGY = 'energy',
  COIN = 'coin',
  LOGIN = 'login',
  CHAT = 'chat',
  ENTER = 'enter',
  EMPTY_PROMO = 'emptyPromo',
}

const defaultStyle = {
  width: '34px',
  height: '34px',
};

export const Icon: React.FC<IIcon> = ({
  style = defaultStyle,
  type,
  callBack,
}) => {
  const switchSrc = (
    type:
      | TypeOfIcons
      | TaskTypes
      | MarkerTypes
      | CouponTypes
      | SettingsType
      | TaskStatuses
      | string
  ) => {
    switch (type) {
      case TypeOfIcons.CHAT:
        return chat;
      case TaskTypes.CHALLENGE:
      case TaskTypes.PRODUCT_QUIZ:
        return challenge;
      case TaskTypes.MISSION:
      case TaskTypes.RELATED_QUIZ:
        return missions;
      case TaskTypes.NBO:
      case TaskTypes.INFORMATIONAL:
        return nbo;
      case TaskTypes.COSMETIC:
        return cosmetics;
      case TypeOfIcons.ENERGY:
        return energy;
      case TypeOfIcons.COIN:
        return coin;
      case TaskTypes.TUTORIAL_TASK:
        return login;
      case MarkerTypes.TASK:
        return notice;
      case MarkerTypes.SUCCESS:
        return success;
      case MarkerTypes.TAKE_REWARD:
        return coinMarker;
      case MarkerTypes.ACTIVE_TASK:
        return activeTask;
      case MarkerTypes.UPGRADE_TOWER:
        return upgradeTower;
      case MarkerTypes.PLAY:
        return play;
      case CouponTypes.COUPON_REPLACE:
        return replace;
      case CouponTypes.COUPON_SKIP:
        return skip;
      case TaskStatuses.NOT_AVAILABLE:
        return notAvailableTask;
      case TypeOfIcons.ENTER:
        return enter;
      case SettingsType.MUSIC:
        return musicActive;
      case SettingsType.SOUND:
        return soundActive;
      case SettingsType.MUSIC + 'disable':
        return musicDisable;
      case SettingsType.SOUND + 'disable':
        return soundDisable;
      case TypeOfIcons.EMPTY_PROMO:
        return emptyPromocode;

      default:
        return promocode;
    }
  };

  return (
    <img style={style} src={switchSrc(type)} alt="icon" onClick={callBack} />
  );
};

interface IIcon {
  style?: {
    width?: string;
    height?: string;
  };
  type:
    | TypeOfIcons
    | TaskTypes
    | MarkerTypes
    | CouponTypes
    | SettingsType
    | TaskStatuses
    | string;

  callBack?: () => void;
}

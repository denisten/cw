import React from 'react';
import challenge from './challenge.svg';
import missions from './missions.svg';
import nbo from './nbo.svg';
import cosmetics from './cosmetics.svg';
import energy from './energy.svg';
import coin from './coin.svg';
import { TaskSubType } from '../../effector/missions-store/store';

export enum TypeOfIcons {
  ENERGY = 'energy',
  COIN = 'coin',
}

const defaultStyle = {
  width: '34px',
  height: '34px',
};

export const Icon: React.FC<IIcon> = ({ style = defaultStyle, type }) => {
  const switchSrc = (type: TypeOfIcons | TaskSubType) => {
    switch (type) {
      case TaskSubType.CHALLENGE:
        return challenge;
      case TaskSubType.MISSIONS:
        return missions;
      case TaskSubType.NBO:
        return nbo;
      case TaskSubType.COSMETICS:
        return cosmetics;
      case TypeOfIcons.ENERGY:
        return energy;
      case TypeOfIcons.COIN:
        return coin;
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
  type: TypeOfIcons | TaskSubType;
}

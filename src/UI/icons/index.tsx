import React from 'react';
import challenge from './challenge.svg';
import missions from './missions.svg';
import nbo from './nbo.svg';
import cosmetics from './cosmetics.svg';
import { TaskSubType } from '../../components/tasks';

export enum TypeOfIcons {
  CHALLENGE = 'challenge',
}

export const Icon: React.FC<IIcon> = ({
  style = { width: '34px', height: '34px' },
  type,
}) => {
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

      default:
        break;
    }
  };

  return <img style={style} loading="lazy" src={switchSrc(type)} />;
};

interface IIcon {
  style?: {
    width?: string;
    height?: string;
  };
  type: TypeOfIcons | TaskSubType;
}

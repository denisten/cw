import React from 'react';
import challenge from './challenge.svg';

export enum TypeOfIcons {
  CHALLENGE = 'challenge',
}

export const Icon: React.FC<IIcon> = ({ style, type }) => {
  const switchSrc = (type: TypeOfIcons) => {
    switch (type) {
      case TypeOfIcons.CHALLENGE:
        return challenge;

      default:
        break;
    }
  };

  return <img style={style} loading="lazy" src={switchSrc(type)} />;
};

interface IIcon {
  style: {
    width?: string;
    height?: string;
  };
  type: TypeOfIcons;
}

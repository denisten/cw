import React from 'react';
import { newImgLoaded } from '../../effector/preloader/events';

export const FRRImg: React.FC<IFRRImg> = ({ src, style }) => (
  <img
    src={src}
    alt={src}
    data-render={true}
    style={style}
    onLoad={() => newImgLoaded()}
  />
);

interface IFRRImg {
  src: string;
  style?: React.CSSProperties;
}

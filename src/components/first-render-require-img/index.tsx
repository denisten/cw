import React from 'react';
import { newImgLoaded } from '../../effector/preloader/events';

export const FRRImg: React.FC<IFRRImg> = ({ src, style, useMap }) => (
  <img
    useMap={useMap}
    src={src}
    alt={src}
    data-render={true}
    style={style}
    onLoad={() => newImgLoaded()}
  />
);

export interface IFRRImg {
  src: string;
  style?: React.CSSProperties;
  useMap?: string;
}

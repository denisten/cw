import React from 'react';
import { ImgWrapper, ImgWrapperProps } from '../img-wrapper';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';

export const AvatarWrapper: React.FC<ImgWrapperProps> = ({ src, ...props }) => {
  return (
    <ImgWrapper
      src={src}
      top="-24px"
      left="-28px"
      {...props}
      width="119px"
      height="126px"
      zIndex={ZIndexes.UI_BUTTON}
    />
  );
};

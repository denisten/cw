import React from 'react';
import { ImgWrapper, ImgWrapperProps } from '../img-wrapper';

export const AvatarWrapper: React.FC<ImgWrapperProps> = ({ src, ...props }) => {
  return <ImgWrapper src={src} {...props} />;
};

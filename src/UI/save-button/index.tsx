import React from 'react';
import { ImgWrapper, ImgWrapperProps } from '../img-wrapper';
import saveImg from './save-img.png';

type SaveButtonProp = Omit<ImgWrapperProps, 'src'>;
export const SaveButton: React.FC<SaveButtonProp> = ({ ...prop }) => {
  return <ImgWrapper src={saveImg} {...prop} />;
};

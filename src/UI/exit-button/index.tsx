import React from 'react';
import exitImg from './close.svg';
import { ImgWrapper, ImgWrapperProps } from '../img-wrapper';

type ExitButtonProps = Omit<ImgWrapperProps, 'src'>;

export const ExitButton: React.FC<ExitButtonProps> = ({
  callBack,
  ...props
}) => {
  return <ImgWrapper callBack={callBack} src={exitImg} {...props} />;
};

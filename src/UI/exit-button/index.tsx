import React from 'react';
import exitImg from './exit.png';
import { ImgWrapper, ImgWrapperProps } from '../img-wrapper';

type ExitButtonProps = Omit<ImgWrapperProps, 'src'>;

export const ExitButton: React.FC<ExitButtonProps> = ({
  callBack,
  ...props
}) => {
  return <ImgWrapper callBack={callBack} src={exitImg} {...props} />;
};

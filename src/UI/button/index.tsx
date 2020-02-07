import React from 'react';
import buttonImg from './button-img.png';
import { ImgWrapper } from '../img-wrapper';

type CustomButtonProps = {
  position?: string;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
};

export const CustomButton: React.FC<CustomButtonProps> = ({
  position,
  top,
  bottom,
  left,
  right,
}) => {
  return (
    <ImgWrapper
      src={buttonImg}
      position={position}
      top={top}
      left={left}
      right={right}
      bottom={bottom}
    />
  );
};

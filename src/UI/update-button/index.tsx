import React from 'react';
import { ImgWrapper } from '../img-wrapper';
import updateImg from './update-img.png';
const StyleConfig = {
  height: '50px',
  zIndex: 9999,
  top: 0,
  left: 50,
  position: 'absolute',
  transformTranslate: '-50%, -50%',
};

export const UpdateButton = () => {
  return <ImgWrapper src={updateImg} {...StyleConfig} />;
};

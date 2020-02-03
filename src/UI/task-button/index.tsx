import React from 'react';
import { ImgWrapper } from '../img-wrapper';
import taskImg from './task-img.png';
import { taskModalWindowOpened } from '../../effector/app-condition/events';
const StyleConfig = {
  height: '5%',
  zIndex: 1,
  top: 5,
  right: 5,
  hoverFlag: true,
};

export const TaskButton = () => {
  return (
    <ImgWrapper
      src={taskImg}
      {...StyleConfig}
      callBack={() => taskModalWindowOpened()}
    />
  );
};

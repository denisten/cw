import React from 'react';
import { ImgWrapper } from '../img-wrapper';
import taskImg from './task-img.png';
import { menuOpened } from '../../effector/app-condition/events';
import { MenuItems } from '../menu-paragraph';

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
      callBack={() => menuOpened(MenuItems.TASKS)}
    />
  );
};

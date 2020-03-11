import React from 'react';
import { ImgWrapper } from '../img-wrapper';
import taskImg from './task-img.png';
import { menuOpened } from '../../effector/app-condition/events';
import { MenuItems } from '../menu-paragraph';
import styled from 'styled-components';

const StyleConfig = {
  zIndex: 1,
  top: 5,
  right: 5,
  hoverFlag: true,
  width: '10vw',
  height: '5vh',
};

const SpanElem = styled.span`
  font-size: 1.05vw;
  font-weight: bold;
  color: #146977;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const TaskButton = () => {
  return (
    <ImgWrapper
      src={taskImg}
      {...StyleConfig}
      callBack={() => {
        menuOpened(MenuItems.TASKS);
      }}
    >
      <SpanElem>ЗАДАНИЯ</SpanElem>
    </ImgWrapper>
  );
};

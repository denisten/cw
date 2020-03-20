import React from 'react';
import { ImgWrapper } from '../img-wrapper';
import taskImg from './task-img.png';
import { menuOpened } from '../../effector/app-condition/events';
import { MenuItems } from '../menu-paragraph';
import styled from 'styled-components';

const StyleConfig = {
  zIndex: 1,
  top: '32px',
  right: '36px',
  hoverFlag: true,
  width: '240px',
  height: '80px',
};

const SpanElem = styled.span`
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: MTSSansBold;
  font-size: 28px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  color: #0290a7;
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

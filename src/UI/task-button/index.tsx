import React from 'react';
import { ImgWrapper } from '../img-wrapper';
import taskImg from './task-img.png';
import {
  menuOpened,
  extraTowerInfoModalClosed,
} from '../../effector/app-condition/events';
import { MenuItems } from '../menu-paragraph';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { TutorialStore } from '../../effector/tutorial-store/store';
import { MTSSans } from '../../fonts';

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
  font-family: ${MTSSans.BOLD};
  font-size: 28px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: -0.5px;
  color: #0290a7;
`;

export const TaskButton = () => {
  const { tutorialCondition } = useStore(TutorialStore);
  return (
    <ImgWrapper
      src={taskImg}
      {...StyleConfig}
      callBack={() => {
        if (!tutorialCondition) {
          extraTowerInfoModalClosed();
          menuOpened(MenuItems.TASKS);
        }
      }}
    >
      <SpanElem>ЗАДАНИЯ</SpanElem>
    </ImgWrapper>
  );
};

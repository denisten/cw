import React from 'react';
import styled from 'styled-components';
import toolbarBackground from './background.svg';
import leftImg from './left.svg';
import rightImg from './right.svg';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';
import { ToolbarElement, ToolbarElements } from '../toolbar-element';
import {
  extraTowerInfoModalClosed,
  menuOpened,
} from '../../effector/app-condition/events';
import { MenuItems } from '../menu-paragraph';
import { ToolbarElementAlert } from '../toolbar-element-alert';
import { useStore } from 'effector-react';
import { MissionsStore } from '../../effector/missions-store/store';
import { TutorialStore } from '../../effector/tutorial-store/store';

const Left = styled.img`
  position: absolute;
  top: 5px;
  left: 24px;
`;
const Right = styled.img`
  position: absolute;
  top: -7px;
  left: 184px;
`;

const ToolbarWrapper = styled.div`
  position: absolute;
  align-items: flex-end;
  width: 327.85px;
  height: 108.37px;
  right: 40px;
  top: 37px;
  z-index: ${ZIndexes.UI_BUTTON + 1};
  box-sizing: border-box;
  display: flex;
  padding: 0 0 16px 18px;
  background-image: url(${toolbarBackground});
  background-repeat: no-repeat;
  background-size: contain;
  user-select: none;
`;

const ToolbarElementWrapper = styled.div`
  width: 63.29px;
  height: 63.29px;
  margin-right: 12px;
  position: relative;
  background: rgba(2, 173, 201, 0.02);
  border: 1px solid rgba(2, 173, 201, 0.2);
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    background: rgba(2, 173, 201, 0.1);
  }
  :active {
    background: rgba(2, 173, 201, 0.2);
    border: 1px solid rgba(2, 173, 201, 0.5);
  }
`;

const handleToolbarElementClick = (type: ToolbarElements) => {
  const { tutorialCondition } = TutorialStore.getState();
  if (!tutorialCondition) {
    extraTowerInfoModalClosed();
    switch (type) {
      case ToolbarElements.TASK:
        return menuOpened(MenuItems.TASKS);
      default:
      case ToolbarElements.SHOP:
      case ToolbarElements.NOTIFICATIONS:
      case ToolbarElements.FEED:
        return;
    }
  }
};
export const Toolbar = () => {
  const mission = useStore(MissionsStore);
  const count = {
    [ToolbarElements.TASK]: mission.length,
    [ToolbarElements.NOTIFICATIONS]: 0,
    [ToolbarElements.FEED]: 0,
    [ToolbarElements.SHOP]: 0,
  };
  return (
    <ToolbarWrapper>
      <Left src={leftImg} />
      <Right src={rightImg} />
      {Object.values(ToolbarElements).map(el => {
        return (
          <ToolbarElementWrapper key={el}>
            <ToolbarElementAlert count={count[el]} />
            <ToolbarElement type={el} callback={handleToolbarElementClick} />
          </ToolbarElementWrapper>
        );
      })}
    </ToolbarWrapper>
  );
};
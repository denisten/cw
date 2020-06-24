import React from 'react';
import styled from 'styled-components';
import toolbarBackground from './background.svg';
import leftImg from './left.svg';
import rightImg from './right.svg';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';

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
`;

const ToolbarElement = styled.div`
  width: 63.29px;
  height: 63.29px;
  margin-right: 12px;
  background: rgba(2, 173, 201, 0.02);
  border: 1px solid rgba(2, 173, 201, 0.2);
  box-sizing: border-box;
  border-radius: 10px;
`;

// extraTowerInfoModalClosed();
// menuOpened(MenuItems.TASKS);
export const Toolbar = () => {
  // const { tutorialCondition } = useStore(TutorialStore);
  return (
    <ToolbarWrapper>
      <Left src={leftImg} />
      <Right src={rightImg} />
      <ToolbarElement />
      <ToolbarElement />
      <ToolbarElement />
      <ToolbarElement />
    </ToolbarWrapper>
  );
};

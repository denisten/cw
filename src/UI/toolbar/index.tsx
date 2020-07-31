import React from 'react';
import styled from 'styled-components';
import toolbarBackground from './background.png';

import { ZIndexes } from '../../components/root-component/z-indexes-enum';
import { ToolbarElement, ToolbarElements } from '../toolbar-element';
import { MenuItems } from '../menu-paragraph';
import { ToolbarElementAlert } from '../toolbar-element-alert';
import { useStore } from 'effector-react';
import { TasksStore } from '../../effector/missions-store/store';
import { TutorialStore } from '../../effector/tutorial-store/store';
import { coughtError } from '../../effector/error-boundary-store/events';
import { pulseAnimationHOF } from '../../hoc/pulse-anim';
import { extraTowerInfoModalClosed } from '../../effector/tower-info-modal-store/events';
import { menuOpened } from '../../effector/menu-store/events';
import { openMarket } from '../../effector/coupons/events';

const ToolbarWrapper = styled.div`
  position: absolute;
  align-items: flex-end;
  width: 327.85px;
  height: 120px;
  right: 40px;
  top: 37px;
  z-index: ${ZIndexes.UI_BUTTON};
  box-sizing: border-box;
  display: flex;
  padding: 0 0 24px 18px;
  background-image: url(${toolbarBackground});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  user-select: none;
`;

const ToolbarElementWrapper = styled.div<{ canPulse: boolean }>`
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
  cursor: pointer;
  :hover {
    background: rgba(2, 173, 201, 0.1);
  }
  :active {
    background: rgba(2, 173, 201, 0.2);
    border: 1px solid rgba(2, 173, 201, 0.5);
  }

  animation: ${props => props.canPulse && pulseAnimationHOF('2, 173, 201')} 1.5s
    infinite linear;
`;

const handleToolbarElementClick = (
  e: React.MouseEvent,
  type: ToolbarElements
) => {
  e.stopPropagation();
  const { tutorialCondition } = TutorialStore.getState();
  if (!tutorialCondition) {
    extraTowerInfoModalClosed();
    switch (type) {
      case ToolbarElements.TASK:
        return menuOpened(MenuItems.TASKS);
      default:
      case ToolbarElements.SHOP:
        return openMarket(true);
      case ToolbarElements.NOTIFICATIONS:
      case ToolbarElements.FEED:
        coughtError({
          text: 'Инструмент в разработке',
        });
        return;
    }
  }
};
export const Toolbar = () => {
  const mission = useStore(TasksStore);
  const count = {
    [ToolbarElements.TASK]: mission.length,
    [ToolbarElements.NOTIFICATIONS]: 0,
    [ToolbarElements.FEED]: 0,
    [ToolbarElements.SHOP]: 0,
  };

  return (
    <ToolbarWrapper>
      {Object.values(ToolbarElements).map(el => {
        return (
          <ToolbarElementWrapper
            key={el}
            onClick={e => handleToolbarElementClick(e, el)}
            canPulse={count[el] > 0 && el === ToolbarElements.TASK}
          >
            <ToolbarElementAlert count={count[el]} />
            <ToolbarElement type={el} />
          </ToolbarElementWrapper>
        );
      })}
    </ToolbarWrapper>
  );
};

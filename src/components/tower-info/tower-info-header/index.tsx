import React from 'react';
import styled from 'styled-components';
import { TutorialConditions } from '../../../effector/tutorial-store/store';
import { pauseTutorialMode } from '../../../effector/tutorial-store/events';
import { ExitButton } from '../../../UI/exit-button';
import { extraTowerInfoModalClosed } from '../../../effector/tower-info-modal-store/events';

const TowerInfoHeaderWrapper = styled.div`
  width: 100%;
  height: 55px;
  flex-shrink: 0;
  position: relative;

  @media (max-resolution: 0.8dppx) {
    height: 5vh;
  }
`;

const styleConfig = {
  top: '25%',
  left: '90%',
  displayFlag: true,
};

export const TowerInfoHeader: React.FC<ITowerInfoHeader> = ({
  tutorialCondition,
}) => {
  const handleExitButtonClick = () => {
    tutorialCondition && pauseTutorialMode();
    extraTowerInfoModalClosed();
  };
  return (
    <TowerInfoHeaderWrapper>
      <ExitButton {...styleConfig} callBack={handleExitButtonClick} />
    </TowerInfoHeaderWrapper>
  );
};

interface ITowerInfoHeader {
  tutorialCondition: TutorialConditions;
}

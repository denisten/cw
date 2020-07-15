import React, { useRef } from 'react';
import styled from 'styled-components';
import { MTSSans } from '../../fonts';
import upgradeImg from './upgrade.svg';
import { showUpgradeIcon } from '../../effector/app-condition/events';
import { towerUpdateHandler } from '../../utils/tower-update-handler';
import { TowersTypes } from '../../effector/towers-progress/store';
import { TutorialConditions } from '../../effector/tutorial-store/store';
import { useEditProgressbarClassname } from '../../hooks/use-edit-progressbar-classname';
import { nextTutorStep } from '../../effector/tutorial-store/events';
import { upgradeTowerAndShowAnimation } from '../../utils/upgrade-tower-and-show-animation';
import { pulseAnimationHOF } from '../../hoc/pulse-anim';
import { maxPercent } from '../../constants';
import { extraTowerInfoModalClosed } from '../../effector/towers/events';

export const UPGRADABLE = 'upgradable';

const ProgressBarWrapper = styled.div`
  position: relative;
  display: flex;
  height: 20px;
  width: 184px;
  border: none;
  overflow: hidden;
  justify-content: flex-start;
  background-color: #d6f0f4;
  transform: skew(-31deg);
  border-radius: 4px 2px 4px 2px;
  box-shadow: inset 0 0 2px 0 rgba(32, 189, 218, 0.18);
  &.${UPGRADABLE} {
    background: #04b5d2;
    justify-content: center;
    animation: ${pulseAnimationHOF('4, 181, 210')} 0.5s infinite;
    &::before,
    &::after {
      display: none;
    }
  }
  &::before {
    position: absolute;
    width: 3px;
    height: 100%;
    background-color: white;
    content: '';
    top: 0;
    left: 33%;
  }
  &::after {
    position: absolute;
    width: 3px;
    height: 100%;
    background-color: white;
    content: '';
    top: 0;
    left: 66%;
  }
`;

const UpgradeButton = styled.div`
  width: 100%;
  height: 100%;
  transform: skew(31deg);
  font-family: ${MTSSans.REGULAR};
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
`;

const ProgressBarGreenLine = styled.div<IProgressBarGreenLine>`
  width: ${props => (props.progress ? props.progress : 0)}%;
  height: 100%;
  box-shadow: inset 0 1px 3px 0 rgba(255, 255, 255, 0.5);
  background-image: linear-gradient(
    to bottom,
    #5adcf9,
    #43d0ed 40%,
    #3acbe8 44%,
    #5edffc
  );
  transition-property: width;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
`;

export const ProgressBar: React.FC<IProgressBar> = ({
  progress,
  towerTitle,
  tutorialCondition,
  needUpgrade,
}) => {
  const progressBarWrapperRef = useRef<HTMLDivElement>(null);

  const handleClick = async () => {
    if (
      tutorialCondition &&
      tutorialCondition === TutorialConditions.UPGRADE_BUTTON_TOWER_INFO &&
      needUpgrade &&
      progress >= maxPercent
    ) {
      upgradeTowerAndShowAnimation(towerTitle);
      extraTowerInfoModalClosed();
      nextTutorStep();
    } else if (needUpgrade) {
      showUpgradeIcon(towerTitle);
      await towerUpdateHandler(TutorialConditions.OFF, towerTitle);
    }
  };
  useEditProgressbarClassname(progressBarWrapperRef.current, needUpgrade);

  const content = !needUpgrade ? (
    <ProgressBarGreenLine progress={progress} />
  ) : (
    <UpgradeButton>
      <img src={upgradeImg} alt="upgrade" /> Улучшить
    </UpgradeButton>
  );

  return (
    <ProgressBarWrapper ref={progressBarWrapperRef} onClick={handleClick}>
      {content}
    </ProgressBarWrapper>
  );
};

interface IProgressBar extends IProgressBarGreenLine {
  towerTitle: TowersTypes;
  tutorialCondition: TutorialConditions;
  needUpgrade: boolean;
}

interface IProgressBarGreenLine {
  progress: number;
}

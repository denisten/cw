import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MTSSans } from '../../fonts';
import upgradeImg from './upgrade.svg';
import { maxPercent } from '../../components/markers/timer';
import { showUpgradeIcon } from '../../effector/app-condition/events';
import { towerUpdateHandler } from '../../utils/tower-update-handler';
import { TowersTypes } from '../../effector/towers-progress/store';
import { TutorialConditions } from '../../effector/tutorial-store/store';

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
  &.task {
    background: #04b5d2;
    justify-content: center;
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
    .task {
      display: none;
    }
  }
`;

const UpgradeButton = styled.div`
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
}) => {
  const progressBarWrapperRef = useRef<HTMLDivElement>(null);
  const isAnimationEnd = useRef(false);
  const handleClick = () => {
    {
      showUpgradeIcon(towerTitle);
      towerUpdateHandler(TutorialConditions.OFF, towerTitle);
    }
  };

  useEffect(() => {
    if (progressBarWrapperRef.current) {
      if (progress && progress >= maxPercent && isAnimationEnd.current) {
        progressBarWrapperRef.current.classList.add('task');
        // debugger;
      } else if (progress && progress < maxPercent) {
        // debugger;
        isAnimationEnd.current = false;
        progressBarWrapperRef.current.classList.remove('task');
      }
    }
    return () => {
      progressBarWrapperRef.current &&
        progressBarWrapperRef.current.classList.remove('task');
    };
  }, [progress]);

  return (
    <ProgressBarWrapper ref={progressBarWrapperRef}>
      {progress < maxPercent && isAnimationEnd.current ? (
        <ProgressBarGreenLine
          progress={progress}
          onTransitionEnd={() => (isAnimationEnd.current = true)}
        />
      ) : (
        <UpgradeButton onClick={handleClick}>
          <img src={upgradeImg} alt="upgrade" /> Повысить здание
        </UpgradeButton>
      )}
    </ProgressBarWrapper>
  );
};

interface IProgressBar extends IProgressBarGreenLine {
  towerTitle: TowersTypes;
}

interface IProgressBarGreenLine {
  progress: number;
}

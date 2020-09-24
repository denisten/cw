import React, { useRef } from 'react';
import styled from 'styled-components';
import { MTSSans } from '../../fonts';
import { showUpgradeIcon } from '../../effector/app-condition/events';
import { towerUpdateHandler } from '../../utils/tower-update-handler';
import {
  TowersTypes,
  TowersProgressStore,
} from '../../effector/towers-progress/store';
import {
  TutorialConditions,
  TutorialStore,
} from '../../effector/tutorial-store/store';
import { useEditProgressbarClassname } from '../../hooks/use-edit-progressbar-classname';
import {
  nextTutorStep,
  setTutorialCondition,
} from '../../effector/tutorial-store/events';
import { upgradeTowerAndShowAnimation } from '../../utils/upgrade-tower-and-show-animation';
import { pulseAnimationHOF } from '../../hoc/pulse-anim';
import { extraTowerInfoModalClosed } from '../../effector/tower-info-modal-store/events';
import { BuildingsService } from '../../buildings/config';
import { reactGAEvent } from '../../utils/ga-event';
import { transliterate } from '../../utils/transliterate';
import { useStore } from 'effector-react';
import energyImg from './energy.svg';
import upgradeImg from './upgrade.svg';

export const UPGRADABLE = 'upgradable';

const EnergyImg = styled.img.attrs({ src: energyImg, alt: 'energy' })`
  margin-right: 10px;
`;

const UpgradeImg = styled.img.attrs({ src: upgradeImg, alt: 'upgrade' })`
  width: 34px;
  height: 34px;
  margin-right: 13px;
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  height: 20px;
  width: 155px;
  overflow: hidden;
  justify-content: flex-start;
  background-color: #d6f0f4;
  border: 1px solid #b2e1e8;
  transform: skew(-31deg);
  border-radius: 4px 2px 4px 2px;
  box-shadow: inset 0 0 2px 0 rgba(32, 189, 218, 0.18);
  &.${UPGRADABLE} {
    border-radius: 10px;
    width: 159px;
    height: 43px;
    transform: skew(0);
    overflow: visible;
    background: #04b5d2;
    justify-content: center;
    animation: ${pulseAnimationHOF('4, 181, 210')} 0.5s infinite;
  }
`;

const Span = styled.span`
  position: absolute;
  left: 192px;
  font-family: ${MTSSans.REGULAR};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: #6e7782;
  white-space: nowrap;
`;

const UpgradeButton = styled.div`
  width: 159px;
  height: 43px;
  background: #33bddb;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 0 21px 0 12px;
  display: flex;
  justify-content: start;
  align-items: center;
  font-family: ${MTSSans.BOLD};
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
`;

const ProgressBarGreenLine = styled.div<IProgressBarGreenLine>`
  width: ${props => (props.progress ? props.progress : 0)}%;
  height: 100%;
  box-shadow: inset 0 1px 3px 0 rgba(255, 255, 255, 0.5);
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    #04b5d2;
  transition-property: width;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
`;

export const ProgressBar: React.FC<IProgressBar> = ({
  points,
  progress,
  towerTitle,
  tutorialCondition,
  needUpgrade,
  maxProgressValue,
}) => {
  const progressBarWrapperRef = useRef<HTMLDivElement>(null);
  const { title } = BuildingsService.getConfigForTower(towerTitle);
  const { level } = useStore(TowersProgressStore)[towerTitle].level;
  const handleClick = async () => {
    if (
      tutorialCondition === TutorialConditions.UPGRADE_BUTTON_TOWER_INFO &&
      needUpgrade
    ) {
      const { tutorialOnAuthorizedUser } = TutorialStore.getState();
      upgradeTowerAndShowAnimation(towerTitle);
      extraTowerInfoModalClosed();
      if (tutorialOnAuthorizedUser) {
        setTutorialCondition(TutorialConditions.FINAL_DIALOG_WITH_AUTH_USER);
      } else {
        nextTutorStep();
      }

      reactGAEvent({
        eventLabel: 'uluchshit',
        eventCategory: 'onboarding',
        eventContent: 'sotovaya_svyaz',
        eventContext: 'step13',
        filterName: 'zdaniya',
      });
    } else if (needUpgrade) {
      showUpgradeIcon(towerTitle);
      await towerUpdateHandler(TutorialConditions.OFF, towerTitle);
      reactGAEvent({
        eventLabel: transliterate(title),
        eventCategory: 'zdanie',
        eventContent: 'uluchshit',
        eventContext: String(level + 1),
      });
    }
  };

  useEditProgressbarClassname(progressBarWrapperRef.current, needUpgrade);
  const content = !needUpgrade ? (
    <ProgressBarGreenLine progress={progress} />
  ) : (
    <UpgradeButton>
      <UpgradeImg /> Улучшить
    </UpgradeButton>
  );
  const quantity = `${points}/${maxProgressValue || '∞'}`;
  return (
    <Wrapper>
      {!needUpgrade && <EnergyImg />}
      <ProgressBarWrapper ref={progressBarWrapperRef} onClick={handleClick}>
        {content}
      </ProgressBarWrapper>
      {!needUpgrade && <Span>{quantity}</Span>}
    </Wrapper>
  );
};

interface IProgressBar extends IProgressBarGreenLine {
  towerTitle: TowersTypes;
  tutorialCondition: TutorialConditions;
  needUpgrade: boolean;
  maxProgressValue: number | null;
  points: number;
}

interface IProgressBarGreenLine {
  progress: number;
}

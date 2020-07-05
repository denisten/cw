import { TowerInfoUpgradeButton } from '../../../UI/tower-info-upgrade-button';
import { TutorialConditions } from '../../../effector/tutorial-store/store';
import { RowWrapper } from '../../../UI/row-wrapper';
import React from 'react';
import styled from 'styled-components';
import { MTSSans } from '../../../fonts';
import { COMMON_TRANSITION, MAX_POINTS } from '../index';
import { BuildingsService } from '../../../buildings/config';
import { showUpgradeIcon } from '../../../effector/app-condition/events';
import { towerUpdateHandler } from '../../../utils/tower-update-handler';
import { useStore } from 'effector-react';
import { AppCondition } from '../../../effector/app-condition/store';
import {
  TowerLevel,
  TowersProgressStore,
  TowersTypes,
} from '../../../effector/towers-progress/store';
import arrow from './arrow.svg';
import arrowHover from './arrow-hover.svg';
import { upgradeTowerAndShowAnimation } from '../../../utils/upgrade-tower-and-show-animation';
import { windowOpen } from '../../../utils/window-open';

const Arrow = styled.div`
  width: 35px;
  height: 35px;
  margin-left: 12px;
  background-image: url(${arrow});
`;

const Title = styled.div<ITitle>`
  font-size: ${props => (props.sizeContent ? '29px' : '32px')};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: -0.5px;
  color: #001424;
  font-family: ${MTSSans.ULTRA_WIDE};
  transition: ${COMMON_TRANSITION}s;
  user-select: none;
  display: flex;
  align-items: center;
  :hover {
    color: #04b5d2;
    cursor: pointer;
  }

  &:hover ${Arrow} {
    background-image: url(${arrowHover});
  }
`;

const styledConfig = {
  width: '100%',
  alignItems: 'center',
};

const canUpgrade = (points: number, maxLevel: TowerLevel, level: TowerLevel) =>
  points >= MAX_POINTS && level < maxLevel;

const pulseAnim = (tutorialCondition: TutorialConditions) =>
  tutorialCondition === TutorialConditions.UPGRADE_BUTTON_TOWER_INFO;

export const TowerInfoTitle: React.FC<ITowerInfoTitle> = ({
  tutorialCondition,
  towerTitle,
}) => {
  const { hideTowerInfo } = useStore(AppCondition);
  const {
    points,
    level: { level },
  } = useStore(TowersProgressStore)[towerTitle];
  const { title, maxLevel, link } = BuildingsService.getConfigForTower(
    towerTitle
  );

  const handleClick = async () => {
    if (towerTitle) {
      showUpgradeIcon(towerTitle);
      await towerUpdateHandler(tutorialCondition, towerTitle);
    }
  };

  const handleTitleClick = () => link && windowOpen(link);
  return (
    <RowWrapper {...styledConfig}>
      <Title sizeContent={hideTowerInfo} onClick={handleTitleClick}>
        {title}
        <Arrow />
      </Title>
      <TowerInfoUpgradeButton
        handleClick={handleClick}
        pulseAnim={pulseAnim(tutorialCondition)}
        canUpgrade={canUpgrade(points, maxLevel, level)}
        hide={hideTowerInfo}
      />
      <TowerInfoUpgradeButton
        handleClick={() => upgradeTowerAndShowAnimation(towerTitle)}
        canUpgrade={level < maxLevel}
      />
    </RowWrapper>
  );
};

interface ITowerInfoTitle {
  towerTitle: TowersTypes;
  tutorialCondition: TutorialConditions;
}

interface ITitle {
  sizeContent: boolean;
}

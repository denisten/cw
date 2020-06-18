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
  TowersProgressStore,
  TowersTypes,
} from '../../../effector/towers-progress/store';
import { upgradeTower } from '../../../effector/towers-progress/events';

const Title = styled.div<{ sizeContent: boolean }>`
  font-size: ${props => (props.sizeContent ? '29px' : '32px')};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: -0.5px;
  color: #001424;
  font-family: ${MTSSans.ULTRA_WIDE};
  transition: ${COMMON_TRANSITION}s;
`;

const styledConfig = {
  width: '100%',
  alignItems: 'center',
};

const delayBeforeAnimationEnd = 2500;

const upgradeTowerAndShowAnimation = (towerTitle: TowersTypes) => {
  showUpgradeIcon(towerTitle);
  setTimeout(() => {
    upgradeTower(towerTitle);
  }, delayBeforeAnimationEnd);
};

export const TowerInfoTitle: React.FC<ITowerInfoTitle> = ({
  tutorialCondition,
  towerTitle,
}) => {
  const { hideTowerInfo } = useStore(AppCondition);
  const LocalTowerProgressStore = useStore(TowersProgressStore);
  const { title, maxLevel } = BuildingsService.getConfigForTower(towerTitle);
  const handleClick = () => {
    if (towerTitle) {
      showUpgradeIcon(towerTitle);
      towerUpdateHandler(tutorialCondition, towerTitle);
    }
  };
  const {
    level: { level },
  } = useStore(TowersProgressStore)[towerTitle];

  return (
    <RowWrapper {...styledConfig}>
      <Title sizeContent={hideTowerInfo}>{title}</Title>
      <TowerInfoUpgradeButton
        handleClick={handleClick}
        pulseAnim={
          tutorialCondition === TutorialConditions.UPGRADE_BUTTON_TOWER_INFO
        }
        canUpgrade={
          LocalTowerProgressStore[towerTitle].points >= MAX_POINTS &&
          level < maxLevel
        }
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

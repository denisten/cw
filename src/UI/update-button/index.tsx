import React from 'react';

import {
  TowersTypes,
  TowersProgressStore,
} from '../../effector/towers-progress/store';
import { showUpgradeIcon } from '../../effector/app-condition/events';
import {
  MarkerView,
  MarkerWrapper,
  MarkerTypes,
} from '../../components/markers';
import { TutorialConditions } from '../../effector/tutorial-store/store';
import { towerUpdateHandler } from '../../utils/tower-update-handler';
import { Icon } from '../icons';
import { reactGAEvent } from '../../utils/ga-event';
import { useStore } from 'effector-react';
import upgradeTowerSound from '../../sound/tower-upgrade.mp3';
import useSound from 'use-sound';
import { SettingsStore } from '../../effector/settings/store';

const handleClick = async (
  towerTitle: TowersTypes,
  tutorialCondition: TutorialConditions
) => {
  showUpgradeIcon(towerTitle);
  await towerUpdateHandler(tutorialCondition, towerTitle);
};

const styleConfig = {
  icons: {
    width: '100%',
    height: '100%',
  },
};

export const UpgradeButton: React.FC<IUpgradeButton> = ({
  towerTitle,
  animFlag = false,
  displayFlag,
  towerLevel,
  tutorialCondition,
  eventLabel,
}) => {
  const { level } = useStore(TowersProgressStore)[towerTitle].level;
  const { volume } = useStore(SettingsStore).sound;
  const [playTowerUpgradeSound] = useSound(upgradeTowerSound, { volume });
  const onClickHandler = async () => {
    reactGAEvent({
      eventLabel: eventLabel,
      eventCategory: 'mir',
      eventContent: 'uluchshit',
      eventContext: String(level + 1),
      buttonLocation: null,
      filterName: 'ikonka',
    });
    playTowerUpgradeSound();
    await handleClick(towerTitle, tutorialCondition);
  };
  return (
    <MarkerWrapper
      displayFlag={displayFlag}
      data-towertype={towerTitle}
      data-towerlevel={towerLevel}
    >
      <MarkerView animFlag={animFlag} onClick={onClickHandler}>
        <Icon type={MarkerTypes.UPGRADE_TOWER} style={styleConfig.icons} />
      </MarkerView>
    </MarkerWrapper>
  );
};

export interface IUpgradeButton {
  towerTitle: TowersTypes;
  animFlag?: boolean;
  displayFlag: boolean;
  towerLevel: number;
  tutorialCondition: TutorialConditions;
  eventLabel?: string;
}

import React from 'react';

import { TowersTypes } from '../../effector/towers-progress/store';
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
  return (
    <MarkerWrapper
      displayFlag={displayFlag}
      data-towertype={towerTitle}
      data-towerlevel={towerLevel}
    >
      <MarkerView
        animFlag={animFlag}
        onClick={() => {
          reactGAEvent({
            eventLabel: eventLabel || '',
            eventCategory: 'mir',
          });
          handleClick(towerTitle, tutorialCondition);
        }}
      >
        <Icon type={MarkerTypes.UPGRADE_TOWER} style={styleConfig.icons} />
      </MarkerView>
    </MarkerWrapper>
  );
};

interface IUpgradeButton {
  towerTitle: TowersTypes;
  animFlag?: boolean;
  displayFlag: boolean;
  towerLevel: number;
  tutorialCondition: TutorialConditions;
  eventLabel?: string;
}

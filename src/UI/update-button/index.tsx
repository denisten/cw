import React from 'react';

import { TowersTypes } from '../../effector/towers-progress/store';
import { showUpgradeIcon } from '../../effector/app-condition/events';
import {
  MarkerView,
  MarkerWrapper,
  TypeOfMarkers,
} from '../../components/markers';
import { TutorialConditions } from '../../effector/tutorial-store/store';
import { towerUpdateHandler } from '../../utils/tower-update-handler';

const handleClick = async (
  towerTitle: TowersTypes,
  tutorialCondition: TutorialConditions
) => {
  showUpgradeIcon(towerTitle);
  await towerUpdateHandler(tutorialCondition, towerTitle);
};

export const UpgradeButton: React.FC<IUpgradeButton> = ({
  towerTitle,
  animFlag = false,
  displayFlag,
  towerLevel,
  tutorialCondition,
}) => {
  return (
    <MarkerWrapper
      displayFlag={displayFlag}
      data-towertype={towerTitle}
      data-towerlevel={towerLevel}
    >
      <MarkerView
        markerType={TypeOfMarkers.UPGRADE_TOWER}
        animFlag={animFlag}
        onClick={() => handleClick(towerTitle, tutorialCondition)}
      />
    </MarkerWrapper>
  );
};

interface IUpgradeButton {
  towerTitle: TowersTypes;
  animFlag?: boolean;
  displayFlag: boolean;
  towerLevel: number;
  tutorialCondition: TutorialConditions;
}

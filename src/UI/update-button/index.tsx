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

export const UpgradeButton: React.FC<UpgradeButtonProps> = ({
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
        onClick={() => {
          showUpgradeIcon(towerTitle);
          towerUpdateHandler(tutorialCondition, towerTitle);
        }}
      />
    </MarkerWrapper>
  );
};

type UpgradeButtonProps = {
  towerTitle: TowersTypes;
  animFlag?: boolean;
  displayFlag: boolean;
  towerLevel: number;
  tutorialCondition: TutorialConditions;
};

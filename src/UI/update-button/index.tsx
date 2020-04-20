import React from 'react';

import { TowersTypes } from '../../effector/towers-progress/store';
import {
  extraTowerInfoModalClosed,
  showUpgradeIcon,
} from '../../effector/app-condition/events';
import {
  MarkerView,
  MarkerWrapper,
  TypeOfMarkers,
} from '../../components/markers';

export const UpgradeButton: React.FC<UpgradeButtonProps> = ({
  towerTitle,
  animFlag = false,
  displayFlag,
}) => {
  return (
    <MarkerWrapper displayFlag={displayFlag}>
      <MarkerView
        markerType={TypeOfMarkers.UPDATE}
        animFlag={animFlag}
        onClick={() => {
          showUpgradeIcon(towerTitle);
          extraTowerInfoModalClosed();
        }}
      />
    </MarkerWrapper>
  );
};

type UpgradeButtonProps = {
  towerTitle: TowersTypes;
  animFlag?: boolean;
  displayFlag: boolean;
};

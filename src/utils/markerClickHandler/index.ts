import { IMarker } from '../../effector/towers-marker/store';
import { hideMarker } from '../../effector/towers-marker/events';
import { TowersTypes } from '../../effector/towers-progress/store';
import { TypeOfMarkers } from '../../components/markers';
import {
  extraTowerInfoModalOpen,
  setTowerInfoContent,
} from '../../effector/app-condition/events';
import { TowerInfoContentValues } from '../../effector/app-condition/store';
import { scrollToCurrentTower } from '../scroll-to-current-tower';
import { RefObject } from 'react';
import { editMoneyCount } from '../../effector/user-data/events';

export const markerClickHandler = (
  marker: IMarker,
  towerTitle: TowersTypes,
  markerRef: RefObject<HTMLDivElement> | undefined
) => {
  hideMarker({ towerTitle: towerTitle, type: marker.type });
  switch (marker.type) {
    case TypeOfMarkers.NOTICE:
    case TypeOfMarkers.SUCCESS:
      extraTowerInfoModalOpen(towerTitle);
      setTowerInfoContent(TowerInfoContentValues.TASK);
      scrollToCurrentTower(markerRef);
      break;
    case TypeOfMarkers.COIN:
      editMoneyCount(marker.coins || 0);
      break;

    default:
      break;
  }
};

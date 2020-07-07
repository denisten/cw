import { IMarker } from '../../effector/towers-marker/store';
import { hideMarker, setMarker } from '../../effector/towers-marker/events';
import { TowersTypes } from '../../effector/towers-progress/store';
import { TypeOfMarkers } from '../../components/markers';
import {
  extraTowerInfoModalOpen,
  setTowerInfoContent,
} from '../../effector/app-condition/events';
import { TowerInfoContentValues } from '../../effector/app-condition/store';
import { scrollToCurrentTower } from '../scroll-to-current-tower';
import React, { RefObject } from 'react';
import { editMoneyCount } from '../../effector/user-data/events';
import { commitIncomes } from '../../api/commit-income';
import { responseStates } from '../../constants';
import { pushMoveElems } from '../../effector/reward/events';

const tmpDelay = 3000;

const setIncome = async (
  towerTitle: TowersTypes,
  marker: IMarker,
  e: React.MouseEvent
) => {
  const { type, forTesting } = marker;
  hideMarker({ towerTitle, type });
  if (forTesting) {
    pushMoveElems({ x: e.clientX, y: e.clientY, id: 0 });
    setTimeout(() => {
      setMarker({
        towerTitle,
        type,
        forTesting,
      });
    }, tmpDelay);
    return;
  }

  pushMoveElems({ x: e.clientX, y: e.clientY, id: 0 });
  const response = await commitIncomes(towerTitle);
  if (response.state === responseStates.SUCCESS) {
    const { balance } = response.data;
    editMoneyCount(balance);
  } else {
    setMarker({ towerTitle, type });
  }
};

export const markerClickHandler = async (
  marker: IMarker,
  towerTitle: TowersTypes,
  markerRef: RefObject<HTMLDivElement> | undefined,
  e: React.MouseEvent
) => {
  switch (marker.type) {
    case TypeOfMarkers.TASK:
    case TypeOfMarkers.SUCCESS:
      extraTowerInfoModalOpen(towerTitle);
      setTowerInfoContent(TowerInfoContentValues.TASK);
      scrollToCurrentTower(markerRef);
      break;
    case TypeOfMarkers.TAKE_REWARD:
      await setIncome(towerTitle, marker, e);
      break;
    case TypeOfMarkers.ACTIVE_TASK:
      extraTowerInfoModalOpen(towerTitle);
      setTowerInfoContent(TowerInfoContentValues.CHAT);
      hideMarker({ towerTitle, type: marker.type });
      break;
    default:
      break;
  }
};

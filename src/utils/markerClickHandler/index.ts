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
import { RefObject } from 'react';
import { editMoneyCount } from '../../effector/user-data/events';
import { commitIncomes } from '../../api/commit-income';
import { responseStates } from '../../constants';
import { pushMoveElems } from '../../effector/reward/events';

const setIncome = async (
  towerTitle: TowersTypes,
  marker: IMarker,
  e: React.MouseEvent
) => {
  hideMarker({ towerTitle: towerTitle, type: marker.type });
  pushMoveElems({ x: e.clientX, y: e.clientY, id: 0 });
  const response = await commitIncomes(towerTitle);
  if (response.state === responseStates.SUCCESS) {
    const { balance } = response.data;
    editMoneyCount(balance);
  } else {
    setMarker({ towerTitle: towerTitle, type: marker.type });
  }
};

export const markerClickHandler = (
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
      hideMarker({ towerTitle: towerTitle, type: marker.type });
      break;
    case TypeOfMarkers.TAKE_REWARD:
      setIncome(towerTitle, marker, e);
      break;

    default:
      break;
  }
};

import { IMarker } from '../../effector/towers-marker/store';
import { hideMarker, setMarker } from '../../effector/towers-marker/events';
import { TowersTypes } from '../../effector/towers-progress/store';
import { TypeOfMarkers } from '../../components/markers';
import {
  extraTowerInfoModalOpen,
  setTowerInfoContent,
} from '../../effector/app-condition/events';
import {
  TowerInfoContentValues,
  AppCondition,
} from '../../effector/app-condition/store';
import { scrollToCurrentTower } from '../scroll-to-current-tower';
import { RefObject } from 'react';
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
  if (marker.forTesting) {
    hideMarker({ towerTitle: towerTitle, type: marker.type });
    pushMoveElems({ x: e.clientX, y: e.clientY, id: 0 });
    setTimeout(() => {
      setMarker({
        towerTitle: towerTitle,
        type: marker.type,
        forTesting: true,
      });
    }, tmpDelay);
    return;
  }

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
  const { fullSizeMode } = AppCondition.getState();
  switch (marker.type) {
    case TypeOfMarkers.TASK:
    case TypeOfMarkers.SUCCESS:
      extraTowerInfoModalOpen(towerTitle);
      setTowerInfoContent(TowerInfoContentValues.TASK);
      if (!fullSizeMode) scrollToCurrentTower(markerRef);
      break;
    case TypeOfMarkers.TAKE_REWARD:
      setIncome(towerTitle, marker, e);
      break;
    case TypeOfMarkers.ACTIVE_TASK:
      extraTowerInfoModalOpen(towerTitle);
      setTowerInfoContent(TowerInfoContentValues.CHAT);
      hideMarker({ towerTitle: towerTitle, type: marker.type });
      break;
    default:
      break;
  }
};

import { IMarker } from '../../effector/towers-marker/store';
import { hideMarker, setMarker } from '../../effector/towers-marker/events';
import { TowersTypes } from '../../effector/towers-progress/store';
import { MarkerTypes } from '../../components/markers';
import { setTowerInfoContent } from '../../effector/app-condition/events';
import { TowerInfoContentValues } from '../../effector/app-condition/store';
import { scrollToCurrentTower } from '../scroll-to-current-tower';
import React, { RefObject } from 'react';
import { editMoneyCount } from '../../effector/user-data/events';
import { commitIncomes } from '../../api/commit-income';
import { pushMoveElements } from '../../effector/reward/events';
import { extraTowerInfoModalOpen } from '../../effector/tower-info-modal-store/events';

const setIncome = async (
  towerTitle: TowersTypes,
  { type }: IMarker,
  e: React.MouseEvent
) => {
  hideMarker({ towerTitle, type });
  pushMoveElements({ x: e.clientX, y: e.clientY, id: 0 });
  try {
    const {
      data: { balance },
    } = await commitIncomes(towerTitle);
    editMoneyCount(balance);
  } catch {
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
    case MarkerTypes.TASK:
    case MarkerTypes.SUCCESS:
      extraTowerInfoModalOpen(towerTitle);
      setTowerInfoContent(TowerInfoContentValues.TASK);
      scrollToCurrentTower(markerRef);
      break;
    case MarkerTypes.TAKE_REWARD:
      await setIncome(towerTitle, marker, e);
      break;
    case MarkerTypes.ACTIVE_TASK:
      extraTowerInfoModalOpen(towerTitle);
      setTowerInfoContent(TowerInfoContentValues.CHAT);
      break;
    case MarkerTypes.PLAY:
      extraTowerInfoModalOpen(towerTitle);
      break;
    default:
      break;
  }
};

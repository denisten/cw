import { TowersDomain } from './domain';
import { TowersTypes } from '../towers-progress/store';

export const extraTowerInfoModalOpen = TowersDomain.event<TowersTypes | null>(
  'User clicked to view extra info about building'
);
export const extraTowerInfoModalClosed = TowersDomain.event(
  'User clicked to close extra info about building'
);
export const toggleExtraTowerInfoModal = TowersDomain.event<number[]>(
  'User toggled modal window'
);
export const setTowerInfoShift = TowersDomain.event<number>();
export const setHideTowerInfo = TowersDomain.event<boolean>();

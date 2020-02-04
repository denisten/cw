import { TowersProgressDomain } from './domain';
import { TowersTypes } from './store';

export type AddProgressPointsProps = {
  points: number;
  towerTitle: TowersTypes;
};

export const addProgressPoints = TowersProgressDomain.event<
  AddProgressPointsProps
>();

export const upgradeTower = TowersProgressDomain.event<TowersTypes>();

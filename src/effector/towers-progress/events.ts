import { TowersProgressDomain } from './domain';
import { TowersTypes, IFactors } from './store';
import { RefObject } from 'react';
import { getAllProgress } from '../../api';
export const addProgressPoints = TowersProgressDomain.event<
  IAddProgressPoints
>();

export const upgradeTower = TowersProgressDomain.event<TowersTypes>();
export const tutorialTowerUpgrade = TowersProgressDomain.event<TowersTypes>();
export const addRefForTower = TowersProgressDomain.event<IAddRefForTower>();
export const fetchAllProductsData = TowersProgressDomain.effect(
  'fetch all products data',
  {
    handler: async () => {
      return await getAllProgress();
    },
  }
);
export const addTowerProgressData = TowersProgressDomain.event<
  IAddTowerProgressData
>();
export const resetTowerProgress = TowersProgressDomain.event();
export interface IAddProgressPoints {
  points: number;
  towerTitle: TowersTypes;
}

interface IAddTowerProgressData {
  newLevel: number;
  income: number;
  towerTitle: TowersTypes;
  levelUpPercentage: number;
  factors?: IFactors;
  points: number;
}

export interface IAddRefForTower {
  ref: RefObject<HTMLDivElement>;
  tower: TowersTypes;
}

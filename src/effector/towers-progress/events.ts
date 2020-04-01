import { TowersProgressDomain } from './domain';
import { TowersTypes } from './store';
import { RefObject } from 'react';
export const addProgressPoints = TowersProgressDomain.event<
  IAddProgressPoints
>();

export const upgradeTower = TowersProgressDomain.event<TowersTypes>();
export const addRefForTower = TowersProgressDomain.event<IAddRefForTower>();

export interface IAddProgressPoints {
  points: number;
  towerTitle: TowersTypes;
}

export interface IAddRefForTower {
  ref: RefObject<HTMLDivElement>;
  tower: TowersTypes;
}

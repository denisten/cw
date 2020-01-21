import React, { Fragment } from 'react';
import { TowerWrapper } from '../UI/tower-component-wrapper';
import { BuildingsService } from './config';
import { useStore } from 'effector-react';
import {
  TowersProgressStore,
  TowersTypes,
} from '../effector/towers-progress/store';

export const Buildings = () => {
  const localService = new BuildingsService();
  const localTowersProgressStore = useStore(TowersProgressStore);
  const towersKeys = Object.keys(localTowersProgressStore) as TowersTypes[];
  return (
    <Fragment>
      {towersKeys.map(el => {
        const data = localService.getConfigForTower(el);
        const currentTower = data[localTowersProgressStore[el]];
        if (currentTower) {
          return (
            <Fragment key={el}>
              <TowerWrapper
                width={currentTower.width}
                height={currentTower.height}
                towerType={el}
                position={currentTower.position}
                areaCoords={currentTower.areaCoords}
                shadowImg={currentTower.shadowImg}
                tower={currentTower.img}
              />
            </Fragment>
          );
        }
      })}
    </Fragment>
  );
};

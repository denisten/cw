import React, { Fragment } from 'react';
import { TowerWrapper } from './first-building';
import { BuildingsService } from './config';
import { useStore } from 'effector-react';
import {
  TowersProgressStore,
  TowersTypes,
} from '../effector/towers-progress/store';

export const Buildings = () => {
  const localService = new BuildingsService();
  const localTowersProgressStore = useStore(TowersProgressStore);
  return (
    <Fragment>
      {Object.keys(localTowersProgressStore).map(el => {
        const data = localService.getConfigForTower(TowersTypes.MAIN_TOWER);
        const currentTower = data[localTowersProgressStore[el]];
        if (currentTower) {
          return (
            <Fragment key={el}>
              <TowerWrapper
                key={el}
                position={data.position}
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

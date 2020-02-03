import React, { Fragment } from 'react';
import { TowerWrapper } from '../UI/tower-component-wrapper';
import { BuildingsService } from './config';
import { useStore } from 'effector-react';
import {
  TowersProgressStore,
  TowersTypes,
} from '../effector/towers-progress/store';
import { AppConditionState } from '../effector/app-condition/store';

export const Buildings = () => {
  const localService = new BuildingsService();
  const localTowersProgressStore = useStore(TowersProgressStore);
  const towersKeys = Object.keys(localTowersProgressStore) as TowersTypes[];
  const { focusOn } = useStore(AppConditionState);
  return (
    <Fragment>
      {towersKeys.map(towerTitle => {
        const data = localService.getConfigForTower(towerTitle);
        const currentTower = data[localTowersProgressStore[towerTitle].level];
        if (currentTower) {
          return (
            <Fragment key={towerTitle}>
              <TowerWrapper
                focusOnTowerTitle={focusOn.towerTitle}
                towerTitle={towerTitle}
                zIndex={data.zIndex}
                towerCoords={data.coords}
                width={currentTower.width}
                height={currentTower.height}
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

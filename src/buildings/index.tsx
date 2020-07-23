import React, { Fragment } from 'react';
import { TowerWrapper } from '../UI/tower-component-wrapper';
import { BuildingsService } from './config';
import { useStore } from 'effector-react';
import {
  TowersProgressStore,
  TowersTypes,
} from '../effector/towers-progress/store';
import { errorStringsParsingHOF } from '../utils/error-handler';

export const Buildings: React.FC = () => {
  const localTowersProgressStore = useStore(TowersProgressStore);
  const towersKeys = Object.keys(localTowersProgressStore) as TowersTypes[];
  return (
    <Fragment>
      {towersKeys.map(towerTitle => {
        const towerLayoutData = BuildingsService.getConfigForTower(towerTitle);
        if (towerLayoutData && towerLayoutData.hide) return null;
        try {
          const towerParams =
            towerLayoutData[localTowersProgressStore[towerTitle].level.level];
          if (towerParams) {
            return (
              <TowerWrapper
                signConfig={towerLayoutData.signConfig}
                animSize={towerLayoutData.animSize}
                mutedImg={towerLayoutData.mutedImg}
                key={towerTitle}
                maxLevel={towerLayoutData.maxLevel}
                currentLevel={localTowersProgressStore[towerTitle].level.level}
                needUpgrade={localTowersProgressStore[towerTitle].needUpgrade}
                towerTitle={towerTitle}
                wideTower={towerLayoutData.wideTower}
                zIndex={towerLayoutData.zIndex}
                width={towerLayoutData.width}
                height={towerLayoutData.height}
                position={towerLayoutData.position}
                areaCoords={towerLayoutData.areaCoords}
                shadowImg={towerParams.shadowImg}
                tower={towerParams.img}
                tutorialTower={towerLayoutData.tutorialTower}
              />
            );
          }
        } catch {
          errorStringsParsingHOF('backendIntegrationError');
        }
      })}
    </Fragment>
  );
};

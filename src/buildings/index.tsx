import React, { Fragment } from 'react';
import { TowerWrapper } from '../UI/tower-component-wrapper';
import { BuildingsService } from './config';
import { useStore } from 'effector-react';
import {
  TowersProgressStore,
  TowersTypes,
} from '../effector/towers-progress/store';
import { AppCondition } from '../effector/app-condition/store';
import { TutorialStore } from '../effector/tutorial-store/store';
import { TowersMarkerStore } from '../effector/towers-marker/store';

export const Buildings: React.FC = () => {
  const localService = new BuildingsService();
  const localTowersProgressStore = useStore(TowersProgressStore);
  const markers = useStore(TowersMarkerStore);
  const towersKeys = Object.keys(localTowersProgressStore) as TowersTypes[];
  const { focusOn, upgradingTowerTitle, scaleValue } = useStore(AppCondition);
  const { tutorialCondition, tutorialPause } = useStore(TutorialStore);
  return (
    <Fragment>
      {towersKeys.map(towerTitle => {
        const data = localService.getConfigForTower(towerTitle);
        if (data.hide) return null;
        const currentTower = data[localTowersProgressStore[towerTitle].level];
        if (currentTower) {
          return (
            <Fragment key={towerTitle}>
              <TowerWrapper
                tutorialCondition={tutorialCondition}
                tutorialPause={tutorialPause}
                upgradeFlag={upgradingTowerTitle === towerTitle}
                maxLevel={data.maxLevel}
                currentLevel={localTowersProgressStore[towerTitle].level}
                progress={localTowersProgressStore[towerTitle].progress}
                focusOnTowerTitle={focusOn}
                towerTitle={towerTitle}
                wideTower={data.wideTower}
                zIndex={data.zIndex}
                width={data.width}
                height={data.height}
                position={data.position}
                areaCoords={data.areaCoords}
                shadowImg={currentTower.shadowImg}
                tower={currentTower.img}
                tutorialTower={data.tutorialTower}
                scaleValue={scaleValue}
                markers={markers[towerTitle].markers}
              />
            </Fragment>
          );
        }
      })}
    </Fragment>
  );
};

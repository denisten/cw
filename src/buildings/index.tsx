import React, { Fragment } from 'react';
import { TowerWrapper } from '../UI/tower-component-wrapper';
import { BuildingsService } from './config';
import { useStore } from 'effector-react';
import {
  TowersProgressStore,
  TowersTypes,
} from '../effector/towers-progress/store';
import { AppConditionStore } from '../effector/app-condition/store';
import { TutorialStore } from '../effector/tutorial-store/store';
import { TowersMarkerStore } from '../effector/towers-marker/store';
import { errorStringsParsingHOF } from '../utils/error-handler';

export const Buildings: React.FC = () => {
  const localTowersProgressStore = useStore(TowersProgressStore);
  const markers = useStore(TowersMarkerStore);
  const towersKeys = Object.keys(localTowersProgressStore) as TowersTypes[];
  const { upgradingTowerTitle, DOMLoaded } = useStore(AppConditionStore);
  const { tutorialCondition, tutorialPause } = useStore(TutorialStore);
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
                animSize={towerLayoutData.animSize}
                mutedImg={towerLayoutData.mutedImg}
                DOMLoaded={DOMLoaded}
                key={towerTitle}
                tutorialCondition={tutorialCondition}
                tutorialPause={tutorialPause}
                upgradeFlag={upgradingTowerTitle === towerTitle}
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
                markers={markers[towerTitle].markers}
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

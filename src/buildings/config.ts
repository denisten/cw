/* eslint no-magic-numbers : 0 */
import firstTowerImg from './first-building/main-tower-level-1.png';
import firstTowerShadow from './first-building/main-tower-level-1-shadow.png';
import { TowersTypes } from '../effector/towers-progress/store';
import { TowerLevel } from './first-building/enums';
export class BuildingsService {
  _config: BuildingServiceConfigTypes = {
    [TowersTypes.MAIN_TOWER]: {
      info: 'info',
      position: [30.3, 46],
      [TowerLevel.low]: {
        img: firstTowerImg,
        width: 1,
        height: 2,
        shadowImg: firstTowerShadow,
        areaCoords: '36,88,248,540',
      },
    },
  };

  getConfigForTower = (towerId: string) => {
    return this._config[towerId];
  };
}

type BuildingServiceConfigTypes = {
  [TowerId: string]: {
    info: string;
    position: number[];
    [TowerLevel.low]: TowerLevelType;
    [TowerLevel.mid]?: TowerLevelType;
    [TowerLevel.high]?: TowerLevelType;
  };
};

type TowerLevelType = {
  img: string;
  width: number;
  height: number;
  shadowImg: string;
  areaCoords: string;
};

/* eslint no-magic-numbers : 0 */
import mainTowerLevel1Img from './main-tower/main-tower-level-1.png';
import mainTowerLevel1Shadow from './main-tower/main-tower-level-1-shadow.png';
import mainTowerLevel2Img from './main-tower/main-tower-level-2.png';
import mainTowerLevel2Shadow from './main-tower/main-tower-level-2-shadow.png';
import mainTowerLevel3Shadow from './main-tower/main-tower-level-3-shadow.png';
import mainTowerLevel3Img from './main-tower/main-tower-level-3.png';
import musicTowerLevel1Img from './music/level-1.png';
import musicTowerLevel1Shadow from './music/level-1-shadow.png';
import musicTowerLevel2Img from './music/level-2.png';
import musicTowerLevel2Shadow from './music/level-2-shadow.png';
import musicTowerLevel3Img from './music/level-3.png';
import musicTowerLevel3Shadow from './music/level-3-shadow.png';
import { TowersTypes } from '../effector/towers-progress/store';
import { TowerLevel } from '../enums';
export class BuildingsService {
  _config: BuildingServiceConfigTypes = {
    [TowersTypes.MAIN_TOWER]: {
      info: 'info',
      coords: [2748, 1313],
      [TowerLevel.low]: {
        img: mainTowerLevel1Img,
        width: 1,
        height: 2,
        shadowImg: mainTowerLevel1Shadow,
        areaCoords: '84,168,299,576',
        position: [29.5, 45.4],
      },
      [TowerLevel.mid]: {
        img: mainTowerLevel2Img,
        width: 1,
        height: 2,
        shadowImg: mainTowerLevel2Shadow,
        areaCoords: '84,121,301,659',
        position: [28.5, 45.4],
      },
      [TowerLevel.high]: {
        img: mainTowerLevel3Img,
        width: 1,
        height: 2,
        shadowImg: mainTowerLevel3Shadow,
        areaCoords: '84,118,319,659',
        position: [28.13, 45.4],
      },
    },
    [TowersTypes.MUSIC]: {
      info: 'info',
      coords: [2271, 1733],
      [TowerLevel.low]: {
        img: musicTowerLevel1Img,
        width: 1,
        height: 2,
        shadowImg: musicTowerLevel1Shadow,
        areaCoords: '128,57,418,291',
        position: [42.2, 36.9],
      },
      [TowerLevel.mid]: {
        img: musicTowerLevel2Img,
        width: 1,
        height: 2,
        shadowImg: musicTowerLevel2Shadow,
        areaCoords: '84,121,301,659',
        position: [41.8, 37],
      },
      [TowerLevel.high]: {
        img: musicTowerLevel3Img,
        width: 1,
        height: 2,
        shadowImg: musicTowerLevel3Shadow,
        areaCoords: '84,118,319,659',
        position: [40.8, 37.4],
      },
    },
  };

  getConfigForTower = (towerId: TowersTypes) => {
    return this._config[towerId];
  };
}

type BuildingServiceConfigTypes = Record<
  TowersTypes,
  CurrentTowerServiceConfigTypes
>;

type CurrentTowerServiceConfigTypes = {
  info: string;
  coords: number[];
  [TowerLevel.low]: TowerLevelType;
  [TowerLevel.mid]: TowerLevelType;
  [TowerLevel.high]: TowerLevelType;
};

type TowerLevelType = {
  img: string;
  width: number;
  height: number;
  shadowImg: string;
  areaCoords: string;
  position: number[];
};

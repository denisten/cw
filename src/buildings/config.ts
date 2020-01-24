import mainTowerLevel1Img from './main-tower/level-1.png';
import mainTowerLevel1Shadow from './main-tower/level-1-shadow.png';
import mainTowerLevel2Img from './main-tower/level-2.png';
import mainTowerLevel2Shadow from './main-tower/level-2-shadow.png';
import mainTowerLevel3Shadow from './main-tower/level-3-shadow.png';
import mainTowerLevel3Img from './main-tower/level-3.png';
import musicTowerLevel1Img from './music/level-1.png';
import musicTowerLevel1Shadow from './music/level-1-shadow.png';
import musicTowerLevel2Img from './music/level-2.png';
import musicTowerLevel2Shadow from './music/level-2-shadow.png';
import musicTowerLevel3Img from './music/level-3.png';
import musicTowerLevel3Shadow from './music/level-3-shadow.png';
import arenaTowerLevel2Img from './arena/level-2.png';
import arenaTowerLevel2Shadow from './arena/level-2-shadow.png';
import mollTowerLevel2Img from './moll/level-2.png';
import mollTowerLevel2Shadow from './moll/level-2-shadow.png';
import eggTowerLevel3Img from './egg/level-3.png';
import eggTowerLevel3Shadow from './egg/level-3-shadow.png';
import libraryTowerLevel2Img from './library/level-2.png';
import libraryTowerLevel2Shadow from './library/level-2-shadow.png';
import observatoryTowerLevel2Img from './observatory/level-2.png';
import observatoryTowerLevel2Shadow from './observatory/level-2-shadow.png';
import tariffTowerLevel2Img from './tariff/level-2.png';
import tariffTowerLevel2Shadow from './tariff/level-2-shadow.png';
import { TowerLevel, TowersTypes } from '../effector/towers-progress/store';

export class BuildingsService {
  _config: BuildingServiceConfigTypes = {
    [TowersTypes.MAIN_TOWER]: {
      info: 'info',
      coords: [2748, 1313],
      zIndex: 2,
      [TowerLevel.low]: {
        img: mainTowerLevel1Img,
        width: 382,
        height: 687,
        shadowImg: mainTowerLevel1Shadow,
        areaCoords: '84,168,299,576',
        position: [29.5, 45.4],
      },
      [TowerLevel.mid]: {
        img: mainTowerLevel2Img,
        width: 382,
        height: 744,
        shadowImg: mainTowerLevel2Shadow,
        areaCoords: '84,121,301,659',
        position: [28.5, 45.4],
      },
      [TowerLevel.high]: {
        img: mainTowerLevel3Img,
        width: 382,
        height: 761,
        shadowImg: mainTowerLevel3Shadow,
        // areaCoords: '84,118,319,659',
        areaCoords: '298,157,87,662',
        position: [28.13, 45.4],
      },
    },
    [TowersTypes.MUSIC]: {
      info: 'info',
      coords: [2271, 1733],
      zIndex: 1,
      [TowerLevel.low]: {
        img: musicTowerLevel1Img,
        width: 504,
        height: 414,
        shadowImg: musicTowerLevel1Shadow,
        areaCoords: '128,57,418,291',
        position: [42.2, 36.9],
      },
      [TowerLevel.mid]: {
        img: musicTowerLevel2Img,
        width: 501,
        height: 441,
        shadowImg: musicTowerLevel2Shadow,
        areaCoords: '84,121,301,659',
        position: [41.8, 37],
      },
      [TowerLevel.high]: {
        img: musicTowerLevel3Img,
        width: 438,
        height: 460,
        shadowImg: musicTowerLevel3Shadow,
        areaCoords: '84,118,319,659',
        position: [40.8, 37.4],
      },
    },
    [TowersTypes.ARENA]: {
      info: 'info',
      coords: [1944, 877],
      zIndex: 1,
      [TowerLevel.low]: {
        // TODO: не настоящая картинка
        img: musicTowerLevel1Img,
        width: 1,
        height: 2,
        shadowImg: musicTowerLevel1Shadow,
        areaCoords: '128,57,418,291',
        position: [42.2, 36.9],
      },
      [TowerLevel.mid]: {
        img: arenaTowerLevel2Img,
        width: 561,
        height: 369,
        shadowImg: arenaTowerLevel2Shadow,
        areaCoords: '95,301,466,77',
        position: [26.6, 34.9],
      },
      [TowerLevel.high]: {
        // TODO: не настоящая картинка
        img: musicTowerLevel3Img,
        width: 1,
        height: 2,
        shadowImg: musicTowerLevel3Shadow,
        areaCoords: '84,118,319,659',
        position: [40.8, 37.4],
      },
    },
    [TowersTypes.MOLL]: {
      info: 'info',
      coords: [2533, 802],
      zIndex: 1,
      [TowerLevel.low]: {
        // TODO: не настоящая картинка
        img: musicTowerLevel1Img,
        width: 1,
        height: 2,
        shadowImg: musicTowerLevel1Shadow,
        areaCoords: '128,57,418,291',
        position: [42.2, 36.9],
      },
      [TowerLevel.mid]: {
        img: mollTowerLevel2Img,
        width: 604,
        height: 468,
        shadowImg: mollTowerLevel2Shadow,
        areaCoords: '74,380,544,63',
        position: [22, 39.9],
      },
      [TowerLevel.high]: {
        // TODO: не настоящая картинка
        img: musicTowerLevel3Img,
        width: 1,
        height: 2,
        shadowImg: musicTowerLevel3Shadow,
        areaCoords: '84,118,319,659',
        position: [40.8, 37.4],
      },
    },
    [TowersTypes.EGG]: {
      info: 'info',
      coords: [3277, 1382],
      zIndex: 2,
      [TowerLevel.low]: {
        // TODO: не настоящая картинка
        img: musicTowerLevel1Img,
        width: 1,
        height: 2,
        shadowImg: musicTowerLevel1Shadow,
        areaCoords: '128,57,418,291',
        position: [42.2, 36.9],
      },
      [TowerLevel.mid]: {
        // TODO: не настоящая картинка
        img: mollTowerLevel2Img,
        width: 604,
        height: 468,
        shadowImg: mollTowerLevel2Shadow,
        areaCoords: '74,380,544,63',
        position: [22, 39.9],
      },
      [TowerLevel.high]: {
        img: eggTowerLevel3Img,
        width: 384,
        height: 531,
        shadowImg: eggTowerLevel3Shadow,
        areaCoords: '320,441,50,45',
        position: [31.5, 50.9],
      },
    },
    [TowersTypes.LIBRARY]: {
      info: 'info',
      coords: [1450, 2169],
      zIndex: 1,
      [TowerLevel.low]: {
        // TODO: не настоящая картинка
        img: musicTowerLevel1Img,
        width: 1,
        height: 2,
        shadowImg: musicTowerLevel1Shadow,
        areaCoords: '128,57,418,291',
        position: [42.2, 36.9],
      },
      [TowerLevel.mid]: {
        img: libraryTowerLevel2Img,
        width: 540,
        height: 540,
        shadowImg: libraryTowerLevel2Shadow,
        areaCoords: '78,92,454,445',
        position: [46.4, 27.6],
      },
      [TowerLevel.high]: {
        // TODO: не настоящая картинка
        img: eggTowerLevel3Img,
        width: 384,
        height: 531,
        shadowImg: eggTowerLevel3Shadow,
        areaCoords: '320,441,50,45',
        position: [31.5, 50.9],
      },
    },
    [TowersTypes.OBSERVATORY]: {
      info: 'info',
      coords: [2039, 1209],
      zIndex: 1,
      [TowerLevel.low]: {
        // TODO: не настоящая картинка
        img: musicTowerLevel1Img,
        width: 1,
        height: 2,
        shadowImg: musicTowerLevel1Shadow,
        areaCoords: '128,57,418,291',
        position: [42.2, 36.9],
      },
      [TowerLevel.mid]: {
        img: observatoryTowerLevel2Img,
        width: 351,
        height: 606,
        shadowImg: observatoryTowerLevel2Shadow,
        areaCoords: '64,129,288,539',
        position: [27.2, 33.3],
      },
      [TowerLevel.high]: {
        // TODO: не настоящая картинка
        img: eggTowerLevel3Img,
        width: 384,
        height: 531,
        shadowImg: eggTowerLevel3Shadow,
        areaCoords: '320,441,50,45',
        position: [31.5, 50.9],
      },
    },
    [TowersTypes.TARIFF]: {
      info: 'info',
      coords: [3066, 1192],
      zIndex: 1,
      [TowerLevel.low]: {
        // TODO: не настоящая картинка
        img: musicTowerLevel1Img,
        width: 1,
        height: 2,
        shadowImg: musicTowerLevel1Shadow,
        areaCoords: '128,57,418,291',
        position: [42.2, 36.9],
      },
      [TowerLevel.mid]: {
        img: tariffTowerLevel2Img,
        width: 330,
        height: 635,
        shadowImg: tariffTowerLevel2Shadow,
        areaCoords: '55,92,284,570',
        position: [27, 48.2],
      },
      [TowerLevel.high]: {
        // TODO: не настоящая картинка
        img: eggTowerLevel3Img,
        width: 384,
        height: 531,
        shadowImg: eggTowerLevel3Shadow,
        areaCoords: '320,441,50,45',
        position: [31.5, 50.9],
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
  zIndex: number;
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

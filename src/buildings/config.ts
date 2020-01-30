import mainTowerLevel1Img from './main-tower/1.png';
import mainTowerLevel1Stroke from './main-tower/1-stroke.png';
import mainTowerLevel2Img from './main-tower/2.png';
import mainTowerLevel2Stroke from './main-tower/2-stroke.png';
import mainTowerLevel3Stroke from './main-tower/3-stroke.png';
import mainTowerLevel3Img from './main-tower/3.png';
import musicTowerLevel1Img from './music/1.png';
import musicTowerLevel1Stroke from './music/1-stroke.png';
import musicTowerLevel2Img from './music/2.png';
import musicTowerLevel2Stroke from './music/2-stroke.png';
import musicTowerLevel3Img from './music/3.png';
import musicTowerLevel3Stroke from './music/3-stroke.png';
import arenaTowerLevel2Img from './arena/2.png';
import arenaTowerLevel2Stroke from './arena/2-stroke.png';
import mollTowerLevel2Img from './moll/2.png';
import mollTowerLevel2Stroke from './moll/2-stroke.png';
import eggTowerLevel3Img from './egg/3.png';
import eggTowerLevel3Stroke from './egg/3-stroke.png';
import libraryTowerLevel2Img from './library/2.png';
import libraryTowerLevel2Stroke from './library/2-stroke.png';
import observatoryTowerLevel2Img from './observatory/2.png';
import observatoryTowerLevel2Stroke from './observatory/2-stroke.png';
import tariffTowerLevel2Img from './tariff/2.png';
import tariffTowerLevel2Stroke from './tariff/2-stroke.png';
import theaterTowerLevel2Img from './theater/2.png';
import theaterTowerLevel2Stroke from './theater/2-stroke.png';
import TVTowerLevel2Stroke from './TV/2-stroke.png';
import TVTowerLevel2Img from './TV/2.png';
import stadiumLevel2Img from './stadium/2.png';
import stadiumLevel2Stroke from './stadium/2-stroke.png';
import { TowerLevel, TowersTypes } from '../effector/towers-progress/store';

export class BuildingsService {
  _config: BuildingServiceConfigTypes = {
    [TowersTypes.MAIN_TOWER]: {
      info: 'info',
      coords: [3672, 2036],
      zIndex: 2,
      [TowerLevel.low]: {
        img: mainTowerLevel1Img,
        width: 382,
        height: 687,
        shadowImg: mainTowerLevel1Stroke,
        areaCoords: '84,168,299,576',
        position: [29.5, 45.4],
      },
      [TowerLevel.mid]: {
        img: mainTowerLevel2Img,
        width: 382,
        height: 744,
        shadowImg: mainTowerLevel2Stroke,
        areaCoords: '84,121,301,659',
        position: [28.5, 45.4],
      },
      [TowerLevel.high]: {
        img: mainTowerLevel3Img,
        width: 382,
        height: 761,
        shadowImg: mainTowerLevel3Stroke,
        areaCoords: '298,157,87,662',
        position: [28.13, 45.4],
      },
    },
    [TowersTypes.MUSIC]: {
      info: 'info',
      coords: [3115, 2455],
      zIndex: 2,
      [TowerLevel.low]: {
        img: musicTowerLevel1Img,
        width: 504,
        height: 414,
        shadowImg: musicTowerLevel1Stroke,
        areaCoords: '128,57,418,291',
        position: [42.2, 36.9],
      },
      [TowerLevel.mid]: {
        img: musicTowerLevel2Img,
        width: 501,
        height: 441,
        shadowImg: musicTowerLevel2Stroke,
        areaCoords: '84,121,301,659',
        position: [41.8, 37],
      },
      [TowerLevel.high]: {
        img: musicTowerLevel3Img,
        width: 438,
        height: 460,
        shadowImg: musicTowerLevel3Stroke,
        areaCoords: '84,118,319,659',
        position: [40.8, 37.4],
      },
    },
    [TowersTypes.ARENA]: {
      info: 'info',
      coords: [3537, 1408],
      zIndex: 1,
      [TowerLevel.low]: {
        // TODO: не настоящая картинка
        img: musicTowerLevel1Img,
        width: 1,
        height: 2,
        shadowImg: musicTowerLevel1Stroke,
        areaCoords: '128,57,418,291',
        position: [42.2, 36.9],
      },
      [TowerLevel.mid]: {
        img: arenaTowerLevel2Img,
        width: 650,
        height: 422,
        shadowImg: arenaTowerLevel2Stroke,
        areaCoords: '590,60,64,365',
        position: [22.3, 41.5],
      },
      [TowerLevel.high]: {
        // TODO: не настоящая картинка
        img: musicTowerLevel3Img,
        width: 1,
        height: 2,
        shadowImg: musicTowerLevel3Stroke,
        areaCoords: '84,118,319,659',
        position: [40.8, 37.4],
      },
    },
    [TowersTypes.MOLL]: {
      info: 'info',
      coords: [4156, 1458],
      zIndex: 1,
      [TowerLevel.low]: {
        // TODO: не настоящая картинка
        img: musicTowerLevel1Img,
        width: 1,
        height: 2,
        shadowImg: musicTowerLevel1Stroke,
        areaCoords: '128,57,418,291',
        position: [42.2, 36.9],
      },
      [TowerLevel.mid]: {
        img: mollTowerLevel2Img,
        width: 604,
        height: 468,
        shadowImg: mollTowerLevel2Stroke,
        areaCoords: '74,380,544,63',
        position: [22.56, 49.95],
      },
      [TowerLevel.high]: {
        // TODO: не настоящая картинка
        img: musicTowerLevel3Img,
        width: 1,
        height: 2,
        shadowImg: musicTowerLevel3Stroke,
        areaCoords: '84,118,319,659',
        position: [40.8, 37.4],
      },
    },
    [TowersTypes.EGG]: {
      info: 'info',
      coords: [4095, 1996],
      zIndex: 2,
      [TowerLevel.low]: {
        // TODO: не настоящая картинка
        img: musicTowerLevel1Img,
        width: 1,
        height: 2,
        shadowImg: musicTowerLevel1Stroke,
        areaCoords: '128,57,418,291',
        position: [42.2, 36.9],
      },
      [TowerLevel.mid]: {
        // TODO: не настоящая картинка
        img: mollTowerLevel2Img,
        width: 604,
        height: 468,
        shadowImg: mollTowerLevel2Stroke,
        areaCoords: '74,380,544,63',
        position: [22, 39.9],
      },
      [TowerLevel.high]: {
        img: eggTowerLevel3Img,
        width: 384,
        height: 531,
        shadowImg: eggTowerLevel3Stroke,
        areaCoords: '320,441,50,45',
        position: [31.5, 50.9],
      },
    },
    [TowersTypes.LIBRARY]: {
      info: 'info',
      coords: [2256, 2490],
      zIndex: 1,
      [TowerLevel.low]: {
        // TODO: не настоящая картинка
        img: musicTowerLevel1Img,
        width: 1,
        height: 2,
        shadowImg: musicTowerLevel1Stroke,
        areaCoords: '128,57,418,291',
        position: [42.2, 36.9],
      },
      [TowerLevel.mid]: {
        img: libraryTowerLevel2Img,
        width: 540,
        height: 540,
        shadowImg: libraryTowerLevel2Stroke,
        areaCoords: '78,92,454,445',
        position: [40.5, 25.7],
      },
      [TowerLevel.high]: {
        // TODO: не настоящая картинка
        img: eggTowerLevel3Img,
        width: 384,
        height: 531,
        shadowImg: eggTowerLevel3Stroke,
        areaCoords: '320,441,50,45',
        position: [31.5, 50.9],
      },
    },
    [TowersTypes.OBSERVATORY]: {
      info: 'info',
      coords: [2688, 1833],
      zIndex: 2,
      [TowerLevel.low]: {
        // TODO: не настоящая картинка
        img: musicTowerLevel1Img,
        width: 1,
        height: 2,
        shadowImg: musicTowerLevel1Stroke,
        areaCoords: '128,57,418,291',
        position: [42.2, 36.9],
      },
      [TowerLevel.mid]: {
        img: observatoryTowerLevel2Img,
        width: 351,
        height: 606,
        shadowImg: observatoryTowerLevel2Stroke,
        areaCoords: '64,129,288,539',
        position: [26.7, 32.8],
      },
      [TowerLevel.high]: {
        // TODO: не настоящая картинка
        img: eggTowerLevel3Img,
        width: 384,
        height: 531,
        shadowImg: eggTowerLevel3Stroke,
        areaCoords: '320,441,50,45',
        position: [31.5, 50.9],
      },
    },
    [TowersTypes.TARIFF]: {
      info: 'info',
      coords: [3867, 1809],
      zIndex: 1,
      [TowerLevel.low]: {
        // TODO: не настоящая картинка
        img: musicTowerLevel1Img,
        width: 1,
        height: 2,
        shadowImg: musicTowerLevel1Stroke,
        areaCoords: '128,57,418,291',
        position: [42.2, 36.9],
      },
      [TowerLevel.mid]: {
        img: tariffTowerLevel2Img,
        width: 330,
        height: 635,
        shadowImg: tariffTowerLevel2Stroke,
        areaCoords: '55,92,284,570',
        position: [27, 48.2],
      },
      [TowerLevel.high]: {
        // TODO: не настоящая картинка
        img: eggTowerLevel3Img,
        width: 384,
        height: 531,
        shadowImg: eggTowerLevel3Stroke,
        areaCoords: '320,441,50,45',
        position: [31.5, 50.9],
      },
    },
    [TowersTypes.THEATER]: {
      info: 'info',
      coords: [2964, 1643],
      zIndex: 1,
      [TowerLevel.low]: {
        // TODO: не настоящая картинка
        img: musicTowerLevel1Img,
        width: 1,
        height: 2,
        shadowImg: musicTowerLevel1Stroke,
        areaCoords: '128,57,418,291',
        position: [42.2, 36.9],
      },
      [TowerLevel.mid]: {
        img: theaterTowerLevel2Img,
        width: 584,
        height: 461,
        shadowImg: theaterTowerLevel2Stroke,
        areaCoords: '518,397,95,92',
        position: [25.5, 35.3],
      },
      [TowerLevel.high]: {
        // TODO: не настоящая картинка
        img: eggTowerLevel3Img,
        width: 384,
        height: 531,
        shadowImg: eggTowerLevel3Stroke,
        areaCoords: '320,441,50,45',
        position: [31.5, 50.9],
      },
    },
    [TowersTypes.TV]: {
      info: 'info',
      coords: [2262, 1726],
      zIndex: 1,
      [TowerLevel.low]: {
        // TODO: не настоящая картинка
        img: musicTowerLevel1Img,
        width: 1,
        height: 2,
        shadowImg: musicTowerLevel1Stroke,
        areaCoords: '128,57,418,291',
        position: [42.2, 36.9],
      },
      [TowerLevel.mid]: {
        img: TVTowerLevel2Img,
        width: 474,
        height: 1058,
        shadowImg: TVTowerLevel2Stroke,
        areaCoords: '365,1006,120,255',
        position: [21.6, 26.42],
      },
      [TowerLevel.high]: {
        // TODO: не настоящая картинка
        img: eggTowerLevel3Img,
        width: 384,
        height: 531,
        shadowImg: eggTowerLevel3Stroke,
        areaCoords: '320,441,50,45',
        position: [31.5, 50.9],
      },
    },
    [TowersTypes.STADIUM]: {
      info: 'info',
      coords: [2705, 2314],
      zIndex: 1,
      [TowerLevel.low]: {
        // TODO: не настоящая картинка
        img: musicTowerLevel1Img,
        width: 1,
        height: 2,
        shadowImg: musicTowerLevel1Stroke,
        areaCoords: '128,57,418,291',
        position: [42.2, 36.9],
      },
      [TowerLevel.mid]: {
        img: stadiumLevel2Img,
        width: 695,
        height: 533,
        shadowImg: stadiumLevel2Stroke,
        areaCoords: '595,126,90,476',
        position: [37.8, 30.6],
      },
      [TowerLevel.high]: {
        // TODO: не настоящая картинка
        img: eggTowerLevel3Img,
        width: 384,
        height: 531,
        shadowImg: eggTowerLevel3Stroke,
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

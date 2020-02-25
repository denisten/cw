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
import mollTowerLevel1Img from './moll/1.png';
import mollTowerLevel2Img from './moll/2.png';
import mollTowerLevel3Img from './moll/3.png';
import mollTowerLevel1Stroke from './moll/1-stroke.png';
import mollTowerLevel2Stroke from './moll/2-stroke.png';
import mollTowerLevel3Stroke from './moll/3-stroke.png';
import eggTowerLevel3Img from './egg/3.png';
import eggTowerLevel3Stroke from './egg/3-stroke.png';
import libraryTowerLevel1Img from './library/1.png';
import libraryTowerLevel2Img from './library/2.png';
import libraryTowerLevel3Img from './library/3.png';
import libraryTowerLevel1Stroke from './library/1-stroke.png';
import libraryTowerLevel2Stroke from './library/2-stroke.png';
import libraryTowerLevel3Stroke from './library/3-stroke.png';
import observatoryTowerLevel2Img from './observatory/2.png';
import observatoryTowerLevel2Stroke from './observatory/2-stroke.png';
import tariffTowerLevel2Img from './tariff/2.png';
import tariffTowerLevel2Stroke from './tariff/2-stroke.png';
import theaterTowerLevel2Img from './theater/2.png';
import theaterTowerLevel2Stroke from './theater/2-stroke.png';
import TVTowerLevel2Stroke from './TV/2-stroke.png';
import TVTowerLevel2Img from './TV/2.png';
import stadiumLevel1Img from './stadium/1.png';
import stadiumLevel2Img from './stadium/2.png';
import stadiumLevel3Img from './stadium/3.png';
import stadiumLevel1Stroke from './stadium/1-stroke.png';
import stadiumLevel2Stroke from './stadium/2-stroke.png';
import stadiumLevel3Stroke from './stadium/3-stroke.png';
import airportLevel1Img from './airport/1.png';
import airportLevel2Img from './airport/2.png';
import airportLevel3Img from './airport/3.png';
import airportLevel1Stroke from './airport/1-stroke.png';
import airportLevel2Stroke from './airport/2-stroke.png';
import airportLevel3Stroke from './airport/3-stroke.png';
import moneyVaultLevel2Img from './money-vault/2.png';
import moneyVaultLevel2Stroke from './money-vault/2-stroke.png';
import bankLevel2Img from './bank/2.png';
import bankLevel2Stroke from './bank/2-stroke.png';
import cyberArenaLevel1Img from './cyber-arena/1.png';
import cyberArenaLevel1Stroke from './cyber-arena/1-stroke.png';
import factoryLevel1Img from './factory/1.png';
import factoryLevel1Stroke from './factory/1-stroke.png';
import { TowerLevel, TowersTypes } from '../effector/towers-progress/store';
import satelliteTvLevel1Img from './satellite-tv/1.png';
import satelliteTvLevel1Stroke from './satellite-tv/1-stroke.png';
import partnerBlueLevel1Img from './partners-build/partner-blue/1.png';
import partnerBlueLevel1Stroke from './partners-build/partner-blue/1-stroke.png';
import partnerYellowLevel1Img from './partners-build/partner-yellow/1.png';
import partnerYellowLevel1Stroke from './partners-build/partner-yellow/1-stroke.png';

export class BuildingsService {
  _config: BuildingServiceConfigTypes = {
    [TowersTypes.MAIN_TOWER]: {
      info: 'info',
      title: 'Тариф минуты',
      coords: [3672, 2036],
      zIndex: 2,
      maxLevel: TowerLevel.high,
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
      title: 'МТС музыка',
      coords: [3115, 2455],
      zIndex: 2,
      maxLevel: TowerLevel.high,
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
      title: 'МТС Арена',
      coords: [3537, 1408],
      zIndex: 1,
      maxLevel: TowerLevel.mid,
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
      title: 'Молл',
      coords: [4156, 1458],
      zIndex: 1,
      maxLevel: TowerLevel.high,
      [TowerLevel.low]: {
        img: mollTowerLevel1Img,
        width: 605,
        height: 425,
        shadowImg: mollTowerLevel1Stroke,
        areaCoords: '531,63,75,378',
        position: [23.3, 50],
      },
      [TowerLevel.mid]: {
        img: mollTowerLevel2Img,
        width: 605,
        height: 466,
        shadowImg: mollTowerLevel2Stroke,
        areaCoords: '533,74,68,408',
        position: [22.56, 49.95],
      },
      [TowerLevel.high]: {
        img: mollTowerLevel3Img,
        width: 604,
        height: 469,
        shadowImg: mollTowerLevel3Stroke,
        areaCoords: '546,52,56,405',
        position: [22.56, 49.95],
      },
    },
    [TowersTypes.EGG]: {
      info: 'info',
      title: 'Мой МТС',
      coords: [4095, 1996],
      zIndex: 2,
      maxLevel: TowerLevel.high,
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
      title: 'Библиотека',
      coords: [2256, 2490],
      zIndex: 2,
      maxLevel: TowerLevel.high,
      [TowerLevel.low]: {
        img: libraryTowerLevel1Img,
        width: 545,
        height: 426,
        shadowImg: libraryTowerLevel1Stroke,
        areaCoords: '88,97,430,332',
        position: [42.5, 25.7],
      },
      [TowerLevel.mid]: {
        img: libraryTowerLevel2Img,
        width: 541,
        height: 446,
        shadowImg: libraryTowerLevel2Stroke,
        areaCoords: '77,54,448,366',
        position: [42, 25.7],
      },
      [TowerLevel.high]: {
        img: libraryTowerLevel3Img,
        width: 530,
        height: 540,
        shadowImg: libraryTowerLevel3Stroke,
        areaCoords: '81,86,444,462',
        position: [40.2, 26],
      },
    },
    [TowersTypes.OBSERVATORY]: {
      info: 'info',
      title: 'Домашний интернет',
      coords: [2688, 1833],
      zIndex: 3,
      maxLevel: TowerLevel.mid,
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
      title: 'Тариф ГБ',
      coords: [3867, 1809],
      zIndex: 1,
      maxLevel: TowerLevel.mid,
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
      title: 'Афиша',
      coords: [2964, 1643],
      zIndex: 1,
      maxLevel: TowerLevel.mid,
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
      title: 'Цифровое ТВ',
      coords: [2262, 1726],
      zIndex: 2,
      maxLevel: TowerLevel.mid,
      [TowerLevel.low]: {
        // TODO: не настоящая картинка
        img: musicTowerLevel1Img,
        width: 1,
        height: 2,
        shadowImg: musicTowerLevel1Stroke,
        areaCoords: '93,286,362,1006',
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
      title: 'Фитнес',
      coords: [2676, 2362],
      zIndex: 1,
      maxLevel: TowerLevel.high,
      [TowerLevel.low]: {
        img: stadiumLevel1Img,
        width: 635,
        height: 391,
        shadowImg: stadiumLevel1Stroke,
        areaCoords: '27,39,524,355',
        position: [39.5, 30.7],
      },
      [TowerLevel.mid]: {
        img: stadiumLevel2Img,
        width: 696,
        height: 414,
        shadowImg: stadiumLevel2Stroke,
        areaCoords: '27,39,524,355',
        position: [39.2, 30.5],
      },
      [TowerLevel.high]: {
        img: stadiumLevel3Img,
        width: 695,
        height: 533,
        shadowImg: stadiumLevel3Stroke,
        areaCoords: '320,441,50,45',
        position: [37.2, 30.5],
      },
    },
    [TowersTypes.AIRPORT]: {
      info: 'info',
      title: 'Роуминг',
      coords: [2481, 1244],
      zIndex: 1,
      maxLevel: TowerLevel.high,
      [TowerLevel.low]: {
        img: airportLevel1Img,
        width: 572,
        height: 398,
        shadowImg: airportLevel1Stroke,
        areaCoords: '510,47,70,345',
        position: [20, 28.5],
      },
      [TowerLevel.mid]: {
        img: airportLevel2Img,
        width: 573,
        height: 406,
        shadowImg: airportLevel2Stroke,
        areaCoords: '595,126,90,476',
        position: [19.7, 28.4],
      },
      [TowerLevel.high]: {
        img: airportLevel3Img,
        width: 573,
        height: 449,
        shadowImg: airportLevel3Stroke,
        areaCoords: '595,126,90,476',
        position: [18.9, 28.3],
      },
    },
    [TowersTypes.MONEY_VAULT]: {
      info: 'info',
      title: 'МТС Деньги',
      coords: [5079, 1441],
      zIndex: 1,
      maxLevel: TowerLevel.mid,
      // TODO: не настоящая картинка
      [TowerLevel.low]: {
        img: airportLevel1Img,
        width: 572,
        height: 398,
        shadowImg: airportLevel1Stroke,
        areaCoords: '510,47,70,345',
        position: [20, 28.5],
      },
      [TowerLevel.mid]: {
        img: moneyVaultLevel2Img,
        width: 584,
        height: 606,
        shadowImg: moneyVaultLevel2Stroke,
        areaCoords: '103,107,483,511',
        position: [20.4, 61.4],
      },
      [TowerLevel.high]: {
        // TODO: не настоящая картинка
        img: airportLevel3Img,
        width: 573,
        height: 449,
        shadowImg: airportLevel3Stroke,
        areaCoords: '595,126,90,476',
        position: [18.9, 28.3],
      },
    },
    [TowersTypes.BANK]: {
      info: 'info',
      title: 'Банк',
      coords: [5404, 1763],
      zIndex: 1,
      maxLevel: TowerLevel.mid,
      // TODO: не настоящая картинка
      [TowerLevel.low]: {
        img: airportLevel1Img,
        width: 572,
        height: 398,
        shadowImg: airportLevel1Stroke,
        areaCoords: '510,47,70,345',
        position: [20, 28.5],
      },
      [TowerLevel.mid]: {
        img: bankLevel2Img,
        width: 579,
        height: 688,
        shadowImg: bankLevel2Stroke,
        areaCoords: '516,39,69,578',
        position: [23, 66.4],
      },
      // TODO: не настоящая картинка
      [TowerLevel.high]: {
        img: airportLevel3Img,
        width: 573,
        height: 449,
        shadowImg: airportLevel3Stroke,
        areaCoords: '595,126,90,476',
        position: [18.9, 28.3],
      },
    },
    [TowersTypes.CYBER_ARENA]: {
      info: 'info',
      title: 'WASD',
      coords: [4860, 2526],
      zIndex: 1,
      maxLevel: TowerLevel.low,
      [TowerLevel.low]: {
        img: cyberArenaLevel1Img,
        width: 765,
        height: 554,
        shadowImg: cyberArenaLevel1Stroke,
        areaCoords: '81,57,675,472',
        position: [40.7, 59],
      },
      // TODO: не настоящая картинка
      [TowerLevel.mid]: {
        img: bankLevel2Img,
        width: 579,
        height: 688,
        shadowImg: bankLevel2Stroke,
        areaCoords: '516,39,69,578',
        position: [23.4, 66.4],
      },
      // TODO: не настоящая картинка
      [TowerLevel.high]: {
        img: airportLevel3Img,
        width: 573,
        height: 449,
        shadowImg: airportLevel3Stroke,
        areaCoords: '595,126,90,476',
        position: [18.9, 28.3],
      },
    },
    [TowersTypes.FACTORY]: {
      info: 'info',
      title: 'Салоный связи',
      coords: [4933, 1921],
      zIndex: 1,
      maxLevel: TowerLevel.low,
      [TowerLevel.low]: {
        img: factoryLevel1Img,
        width: 790,
        height: 582,
        shadowImg: factoryLevel1Stroke,
        areaCoords: '715,137,109,481',
        position: [28.3, 58.6],
      },
      // TODO: не настоящая картинка
      [TowerLevel.mid]: {
        img: bankLevel2Img,
        width: 579,
        height: 688,
        shadowImg: bankLevel2Stroke,
        areaCoords: '516,39,69,578',
        position: [23.4, 66.4],
      },
      // TODO: не настоящая картинка
      [TowerLevel.high]: {
        img: airportLevel3Img,
        width: 573,
        height: 449,
        shadowImg: airportLevel3Stroke,
        areaCoords: '595,126,90,476',
        position: [18.9, 28.3],
      },
    },
    [TowersTypes.SATELLITETV]: {
      info: 'info',
      title: 'Спутниковое TV',
      coords: [2530, 1904],
      zIndex: 2,
      maxLevel: TowerLevel.low,
      [TowerLevel.low]: {
        img: satelliteTvLevel1Img,
        width: 479,
        height: 585,
        shadowImg: satelliteTvLevel1Stroke,
        areaCoords: '80,46,398,531',
        position: [25.9, 30],
      },
      // TODO: не настоящая картинка
      [TowerLevel.mid]: {
        img: bankLevel2Img,
        width: 579,
        height: 688,
        shadowImg: bankLevel2Stroke,
        areaCoords: '516,39,69,578',
        position: [23.4, 66.4],
      },
      // TODO: не настоящая картинка
      [TowerLevel.high]: {
        img: airportLevel3Img,
        width: 573,
        height: 449,
        shadowImg: airportLevel3Stroke,
        areaCoords: '595,126,90,476',
        position: [18.9, 28.3],
      },
    },
    [TowersTypes.PARTNER_BLUE]: {
      info: 'info',
      title: 'Здание партнера',
      coords: [3958, 2773],
      zIndex: 2,
      maxLevel: TowerLevel.low,
      [TowerLevel.low]: {
        img: partnerBlueLevel1Img,
        width: 375,
        height: 645,
        shadowImg: partnerBlueLevel1Stroke,
        areaCoords: '51,49,336,590',
        position: [41, 49.2],
      },
      // TODO: не настоящая картинка
      [TowerLevel.mid]: {
        img: bankLevel2Img,
        width: 579,
        height: 688,
        shadowImg: bankLevel2Stroke,
        areaCoords: '516,39,69,578',
        position: [23.4, 66.4],
      },
      // TODO: не настоящая картинка
      [TowerLevel.high]: {
        img: airportLevel3Img,
        width: 573,
        height: 449,
        shadowImg: airportLevel3Stroke,
        areaCoords: '595,126,90,476',
        position: [18.9, 28.3],
      },
    },
    [TowersTypes.PARTNER_YELLOW]: {
      info: 'info',
      title: 'Здание партнера 2',
      coords: [3718, 2932],
      zIndex: 2,
      maxLevel: TowerLevel.low,
      [TowerLevel.low]: {
        img: partnerYellowLevel1Img,
        width: 657,
        height: 690,
        shadowImg: partnerYellowLevel1Stroke,
        areaCoords: '53,54,604,641',
        position: [44, 42.8],
      },
      // TODO: не настоящая картинка
      [TowerLevel.mid]: {
        img: bankLevel2Img,
        width: 579,
        height: 688,
        shadowImg: bankLevel2Stroke,
        areaCoords: '516,39,69,578',
        position: [23.4, 66.4],
      },
      // TODO: не настоящая картинка
      [TowerLevel.high]: {
        img: airportLevel3Img,
        width: 573,
        height: 449,
        shadowImg: airportLevel3Stroke,
        areaCoords: '595,126,90,476',
        position: [18.9, 28.3],
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
  title: string;
  coords: number[];
  zIndex: number;
  maxLevel: TowerLevel;
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

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
import arenaTowerLevel1Img from './arena/1.png';
import arenaTowerLevel1Stroke from './arena/1-stroke.png';
import arenaTowerLevel2Img from './arena/2.png';
import arenaTowerLevel2Stroke from './arena/2-stroke.png';
import arenaTowerLevel3Img from './arena/3.png';
import arenaTowerLevel3Stroke from './arena/3-stroke.png';
import mollTowerLevel1Img from './moll/1.png';
import mollTowerLevel2Img from './moll/2.png';
import mollTowerLevel3Img from './moll/3.png';
import mollTowerLevel1Stroke from './moll/1-stroke.png';
import mollTowerLevel2Stroke from './moll/2-stroke.png';
import mollTowerLevel3Stroke from './moll/3-stroke.png';
import eggTowerLevel1Img from './egg/1.png';
import eggTowerLevel1Stroke from './egg/1-stroke.png';
import eggTowerLevel2Img from './egg/2.png';
import eggTowerLevel2Stroke from './egg/2-stroke.png';
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
import theaterTowerLevel3Img from './theater/3.png';
import theaterTowerLevel3Stroke from './theater/3-stroke.png';
import TVTowerLevel1Stroke from './TV/1-stroke.png';
import TVTowerLevel1Img from './TV/1.png';
import TVTowerLevel2Stroke from './TV/2-stroke.png';
import TVTowerLevel2Img from './TV/2.png';
import TVTowerLevel3Stroke from './TV/3-stroke.png';
import TVTowerLevel3Img from './TV/3.png';
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
import bankLevel1Img from './bank/1.png';
import bankLevel1Stroke from './bank/1-stroke.png';
import bankLevel2Img from './bank/2.png';
import bankLevel2Stroke from './bank/2-stroke.png';
import bankLevel3Img from './bank/3.png';
import bankLevel3Stroke from './bank/3-stroke.png';
import cyberArenaLevel3Img from './cyber-arena/3.png';
import cyberArenaLevel2Img from './cyber-arena/2.png';
import cyberArenaLevel1Img from './cyber-arena/1.png';
import cyberArenaLevel3Stroke from './cyber-arena/3-stroke.png';
import cyberArenaLevel2Stroke from './cyber-arena/2-stroke.png';
import cyberArenaLevel1Stroke from './cyber-arena/1-stroke.png';
import { TowerLevel, TowersTypes } from '../effector/towers-progress/store';
import satelliteTvLevel1Img from './satellite-tv/1.png';
import satelliteTvLevel1Stroke from './satellite-tv/1-stroke.png';
import partnerBlueLevel1Img from './partners-build/partner-blue/1.png';
import partnerBlueLevel1Stroke from './partners-build/partner-blue/1-stroke.png';
import partnerYellowLevel1Img from './partners-build/partner-yellow/1.png';
import partnerYellowLevel1Stroke from './partners-build/partner-yellow/1-stroke.png';
import slotMachineLevel1Img from './slot-machine/1.png';
import slotMachineLevel1Stroke from './slot-machine/1-stroke.png';
import routerLevel1Img from './router/1.png';
import routerLevel1Stroke from './router/1-stroke.png';
import autoFactoryLevel1Img from './auto-factory/1.png';
import autoFactoryLevel1Stroke from './auto-factory/1-stroke.png';
import autoFactoryLevel2Img from './auto-factory/2.png';
import autoFactoryLevel2Stroke from './auto-factory/2-stroke.png';
import autoFactoryLevel3Img from './auto-factory/3.png';
import autoFactoryLevel3Stroke from './auto-factory/3-stroke.png';
import rtkLevel1Img from './rtk/1.png';
import rtkLevel1Stroke from './rtk/1-stroke.png';
import partnerBankLevel2Img from './partners-build/partner-bank/2.png';
import partnerBankLevel2Stroke from './partners-build/partner-bank/2-stroke.png';
import marvinLevel1Img from './marvin/1.png';
import marvinLevel1Stroke from './marvin/1-stroke.png';
import { ZIndexes } from '../components/root-component/z-indexes-enum';

export class BuildingsService {
  _config: BuildingServiceConfigTypes = {
    [TowersTypes.MAIN_TOWER]: {
      info: 'info',
      title: 'Сотовая связь',
      coords: [3672, 2036],
      zIndex: ZIndexes.BUILDING_TWO_LEVEL,
      maxLevel: TowerLevel.high,
      tutorialTower: true,
      [TowerLevel.low]: {
        img: mainTowerLevel1Img,
        width: 382,
        height: 687,
        shadowImg: mainTowerLevel1Stroke,
        areaCoords: '84,168,299,576',
        position: [29.3, 45.4],
      },
      [TowerLevel.mid]: {
        img: mainTowerLevel2Img,
        width: 382,
        height: 744,
        shadowImg: mainTowerLevel2Stroke,
        areaCoords: '84,121,301,659',
        position: [28.3, 45.4],
      },
      [TowerLevel.high]: {
        img: mainTowerLevel3Img,
        width: 382,
        height: 761,
        shadowImg: mainTowerLevel3Stroke,
        areaCoords: '298,157,87,662',
        position: [28, 45.4],
      },
    },
    [TowersTypes.MUSIC]: {
      info: 'info',
      title: 'МТС музыка',
      coords: [3115, 2455],
      zIndex: ZIndexes.BUILDING_TWO_LEVEL,
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
      zIndex: ZIndexes.BUILDING_ONE_LEVEL,
      maxLevel: TowerLevel.high,
      [TowerLevel.low]: {
        img: arenaTowerLevel1Img,
        width: 566,
        height: 371,
        shadowImg: arenaTowerLevel1Stroke,
        areaCoords: '48,47,514,314',
        position: [23.3, 42],
      },
      [TowerLevel.mid]: {
        img: arenaTowerLevel2Img,
        width: 640,
        height: 425,
        shadowImg: arenaTowerLevel2Stroke,
        areaCoords: '52,47,583,372',
        position: [22.3, 41.3],
      },
      [TowerLevel.high]: {
        img: arenaTowerLevel3Img,
        width: 699,
        height: 466,
        shadowImg: arenaTowerLevel3Stroke,
        areaCoords: '44,53,649,413',
        position: [21.78, 41.3],
      },
    },
    [TowersTypes.MOLL]: {
      info: 'info',
      title: 'МТС Кэшбэк',
      coords: [4156, 1458],
      zIndex: ZIndexes.BUILDING_ONE_LEVEL,
      maxLevel: TowerLevel.high,
      [TowerLevel.low]: {
        img: mollTowerLevel1Img,
        width: 605,
        height: 425,
        shadowImg: mollTowerLevel1Stroke,
        areaCoords: '531,63,75,378',
        position: [23.1, 49.9],
      },
      [TowerLevel.mid]: {
        img: mollTowerLevel2Img,
        width: 604,
        height: 469,
        shadowImg: mollTowerLevel2Stroke,
        areaCoords: '533,74,68,408',
        position: [22.3, 49.9],
      },
      [TowerLevel.high]: {
        img: mollTowerLevel3Img,
        width: 605,
        height: 461,
        shadowImg: mollTowerLevel3Stroke,
        areaCoords: '546,52,56,405',
        position: [22.36, 49.89],
      },
    },
    [TowersTypes.EGG]: {
      info: 'info',
      title: 'Мой МТС',
      coords: [4095, 1996],
      zIndex: ZIndexes.BUILDING_TWO_LEVEL,
      maxLevel: TowerLevel.high,
      [TowerLevel.low]: {
        img: eggTowerLevel1Img,
        width: 331,
        height: 398,
        shadowImg: eggTowerLevel1Stroke,
        areaCoords: '44,45,285,351',
        position: [34.1, 51.3],
      },
      [TowerLevel.mid]: {
        img: eggTowerLevel2Img,
        width: 347,
        height: 478,
        shadowImg: eggTowerLevel2Stroke,
        areaCoords: '45,45,295,432',
        position: [32.6, 51.3],
      },
      [TowerLevel.high]: {
        img: eggTowerLevel3Img,
        width: 384,
        height: 531,
        shadowImg: eggTowerLevel3Stroke,
        areaCoords: '43,36,322,483',
        position: [31.6, 51.1],
      },
    },
    [TowersTypes.LIBRARY]: {
      info: 'info',
      title: 'Библиотека',
      coords: [2256, 2490],
      zIndex: ZIndexes.BUILDING_TWO_LEVEL,
      maxLevel: TowerLevel.high,
      [TowerLevel.low]: {
        img: libraryTowerLevel1Img,
        width: 545,
        height: 426,
        shadowImg: libraryTowerLevel1Stroke,
        areaCoords: '88,97,430,332',
        position: [42.29, 25.98],
      },
      [TowerLevel.mid]: {
        img: libraryTowerLevel2Img,
        width: 541,
        height: 446,
        shadowImg: libraryTowerLevel2Stroke,
        areaCoords: '77,54,448,366',
        position: [41.9, 25.95],
      },
      [TowerLevel.high]: {
        img: libraryTowerLevel3Img,
        width: 540,
        height: 504,
        shadowImg: libraryTowerLevel3Stroke,
        areaCoords: '81,86,444,462',
        position: [40.9, 25.92],
      },
    },
    [TowersTypes.OBSERVATORY]: {
      info: 'info',
      title: 'Здание партнера',
      coords: [2688, 1833],
      zIndex: ZIndexes.BUILDING_THREE_LEVEL,
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
      title: 'Мобильный интернет',
      coords: [3867, 1809],
      zIndex: ZIndexes.BUILDING_ONE_LEVEL,
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
      title: 'МТС Афиша',
      coords: [2964, 1643],
      zIndex: ZIndexes.BUILDING_ONE_LEVEL,
      maxLevel: TowerLevel.mid,
      [TowerLevel.low]: {
        // TODO: не настоящая картинка
        img: musicTowerLevel1Img,
        width: 1,
        height: 2,
        shadowImg: musicTowerLevel1Stroke,
        areaCoords: '128,57,418,291',
        position: [42.2, 36.85],
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
        img: theaterTowerLevel3Img,
        width: 679,
        height: 459,
        shadowImg: theaterTowerLevel3Stroke,
        areaCoords: '46,41,639,415',
        position: [25.8, 34.6],
      },
    },
    [TowersTypes.TV]: {
      info: 'info',
      title: 'Цифровое ТВ',
      coords: [2262, 1726],
      zIndex: ZIndexes.BUILDING_THREE_LEVEL,
      maxLevel: TowerLevel.high,
      [TowerLevel.low]: {
        img: TVTowerLevel1Img,
        width: 486,
        height: 842,
        shadowImg: TVTowerLevel1Stroke,
        areaCoords: '49,52,434,789',
        position: [25.74, 26.35],
      },
      [TowerLevel.mid]: {
        img: TVTowerLevel2Img,
        width: 474,
        height: 987,
        shadowImg: TVTowerLevel2Stroke,
        areaCoords: '48,45,430,940',
        position: [22.9, 26.42],
      },
      [TowerLevel.high]: {
        img: TVTowerLevel3Img,
        width: 474,
        height: 1058,
        shadowImg: TVTowerLevel3Stroke,
        areaCoords: '48,44,428,1016',
        position: [21.6, 26.42],
      },
    },
    [TowersTypes.STADIUM]: {
      info: 'info',
      title: 'МТС Фитнес',
      coords: [2676, 2362],
      zIndex: ZIndexes.BUILDING_ONE_LEVEL,
      maxLevel: TowerLevel.high,
      [TowerLevel.low]: {
        img: stadiumLevel1Img,
        width: 635,
        height: 391,
        shadowImg: stadiumLevel1Stroke,
        areaCoords: '27,39,524,355',
        position: [40.4, 30.8],
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
      zIndex: ZIndexes.BUILDING_ONE_LEVEL,
      maxLevel: TowerLevel.high,
      [TowerLevel.low]: {
        img: airportLevel1Img,
        width: 572,
        height: 398,
        shadowImg: airportLevel1Stroke,
        areaCoords: '510,47,70,345',
        position: [19.9, 29.3],
      },
      [TowerLevel.mid]: {
        img: airportLevel2Img,
        width: 573,
        height: 406,
        shadowImg: airportLevel2Stroke,
        areaCoords: '595,126,90,476',
        position: [19.7, 29.4],
      },
      [TowerLevel.high]: {
        img: airportLevel3Img,
        width: 573,
        height: 449,
        shadowImg: airportLevel3Stroke,
        areaCoords: '595,126,90,476',
        position: [18.9, 29.4],
      },
    },
    [TowersTypes.BANK]: {
      info: 'info',
      title: 'Банк',
      coords: [5045, 1559],
      zIndex: ZIndexes.BUILDING_ONE_LEVEL,
      maxLevel: TowerLevel.high,
      [TowerLevel.low]: {
        img: bankLevel1Img,
        width: 532,
        height: 461,
        shadowImg: bankLevel1Stroke,
        areaCoords: '50,62,482,408',
        position: [22.9, 61.8],
      },
      [TowerLevel.mid]: {
        img: bankLevel2Img,
        width: 584,
        height: 593,
        shadowImg: bankLevel2Stroke,
        areaCoords: '47,52,536,541',
        position: [20.5, 61.4],
      },
      [TowerLevel.high]: {
        img: bankLevel3Img,
        width: 585,
        height: 593,
        shadowImg: bankLevel3Stroke,
        areaCoords: '50,47,545,545',
        position: [20.5, 61.4],
      },
    },
    [TowersTypes.CYBER_ARENA]: {
      info: 'info',
      title: 'WASD',
      coords: [4912, 2593],
      zIndex: ZIndexes.BUILDING_ONE_LEVEL,
      maxLevel: TowerLevel.high,
      [TowerLevel.low]: {
        img: cyberArenaLevel1Img,
        width: 658,
        height: 443,
        shadowImg: cyberArenaLevel1Stroke,
        areaCoords: '81,57,675,472',
        position: [42.1, 59.2],
      },
      [TowerLevel.mid]: {
        img: cyberArenaLevel2Img,
        width: 697,
        height: 491,
        shadowImg: cyberArenaLevel2Stroke,
        areaCoords: '516,39,69,578',
        position: [41.4, 59.2],
      },
      [TowerLevel.high]: {
        img: cyberArenaLevel3Img,
        width: 765,
        height: 554,
        shadowImg: cyberArenaLevel3Stroke,
        areaCoords: '595,126,90,476',
        position: [40.7, 59],
      },
    },

    [TowersTypes.AUTO_FACTORY]: {
      info: 'info',
      title: 'МТС авто',
      coords: [5007, 1993],
      zIndex: ZIndexes.BUILDING_TWO_LEVEL,
      maxLevel: TowerLevel.high,
      [TowerLevel.low]: {
        img: autoFactoryLevel1Img,
        width: 662,
        height: 499,
        shadowImg: autoFactoryLevel1Stroke,
        areaCoords: '49,143,613,448',
        position: [29.6, 59.3],
      },
      [TowerLevel.mid]: {
        img: autoFactoryLevel2Img,
        width: 737,
        height: 550,
        shadowImg: autoFactoryLevel2Stroke,
        areaCoords: '41,59,688,498',
        position: [29, 59.1],
      },
      [TowerLevel.high]: {
        img: autoFactoryLevel3Img,
        width: 736,
        height: 550,
        shadowImg: autoFactoryLevel3Stroke,
        areaCoords: '51,55,682,499',
        position: [29, 59.1],
      },
    },

    [TowersTypes.SATELLITETV]: {
      info: 'info',
      title: 'Спутниковое TV',
      coords: [2530, 1904],
      zIndex: ZIndexes.BUILDING_TWO_LEVEL,
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
      coords: [3476, 2918],
      zIndex: ZIndexes.BUILDING_TWO_LEVEL,
      maxLevel: TowerLevel.low,
      [TowerLevel.low]: {
        img: partnerBlueLevel1Img,
        width: 375,
        height: 645,
        shadowImg: partnerBlueLevel1Stroke,
        areaCoords: '51,49,336,590',
        position: [44.4, 42.6],
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
      coords: [3253, 3163],
      zIndex: ZIndexes.BUILDING_TWO_LEVEL,
      maxLevel: TowerLevel.low,
      [TowerLevel.low]: {
        img: partnerYellowLevel1Img,
        width: 657,
        height: 690,
        shadowImg: partnerYellowLevel1Stroke,
        areaCoords: '53,54,604,641',
        position: [48.9, 36.8],
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
    [TowersTypes.SLOT_MACHINE]: {
      info: 'info',
      title: 'Игротека',
      coords: [5415, 2871],
      zIndex: ZIndexes.BUILDING_TWO_LEVEL,
      maxLevel: TowerLevel.low,
      [TowerLevel.low]: {
        img: slotMachineLevel1Img,
        width: 451,
        height: 604,
        shadowImg: slotMachineLevel1Stroke,
        areaCoords: '392,148,101,545',
        position: [43.6, 66.7],
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
    [TowersTypes.ROUTER]: {
      info: 'info',
      title: 'Роутер',
      coords: [2572, 2828],
      zIndex: ZIndexes.BUILDING_TWO_LEVEL,
      maxLevel: TowerLevel.low,
      [TowerLevel.low]: {
        img: routerLevel1Img,
        width: 503,
        height: 539,
        shadowImg: routerLevel1Stroke,
        areaCoords: '434,188,79,472',
        position: [45, 30],
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
    [TowersTypes.RTK]: {
      info: 'info',
      title: 'РТК',
      coords: [5392, 1788],
      zIndex: ZIndexes.BUILDING_TWO_LEVEL,
      maxLevel: TowerLevel.low,
      [TowerLevel.low]: {
        img: rtkLevel1Img,
        width: 530,
        height: 555,
        shadowImg: rtkLevel1Stroke,
        areaCoords: '74,67,456,472',
        position: [25, 66.8],
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
    [TowersTypes.PARTNER_BANK]: {
      info: 'info',
      title: 'Партнерское здание',
      coords: [4036, 2797],
      zIndex: ZIndexes.BUILDING_ONE_LEVEL,
      maxLevel: TowerLevel.low,
      // TODO: не настоящая картинка
      [TowerLevel.low]: {
        img: rtkLevel1Img,
        width: 530,
        height: 555,
        shadowImg: rtkLevel1Stroke,
        areaCoords: '74,67,456,472',
        position: [30, 66.8],
      },
      [TowerLevel.mid]: {
        img: partnerBankLevel2Img,
        width: 579,
        height: 688,
        shadowImg: partnerBankLevel2Stroke,
        areaCoords: '60,45,513,572',
        position: [42.3, 48],
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
    [TowersTypes.MARVIN]: {
      info: 'info',
      title: 'Колонка Марвин',
      coords: [4416, 2950],
      zIndex: ZIndexes.BUILDING_ONE_LEVEL,
      maxLevel: TowerLevel.low,
      [TowerLevel.low]: {
        img: marvinLevel1Img,
        width: 378,
        height: 452,
        shadowImg: marvinLevel1Stroke,
        areaCoords: '275,54,94,368',
        position: [48, 54.8],
      },
      // TODO: не настоящая картинка
      [TowerLevel.mid]: {
        img: partnerBankLevel2Img,
        width: 579,
        height: 688,
        shadowImg: partnerBankLevel2Stroke,
        areaCoords: '60,45,513,572',
        position: [42.3, 48],
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
  tutorialTower?: boolean;
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

import cloud1 from './clouds_01.png';
import cloud2 from './clouds_02.png';
import cloud3 from './clouds_03.png';
import cloud4 from './clouds_04.png';
import cloud5 from './clouds_05.png';
import cloud6 from './clouds_06.png';
import cloud7 from './clouds_07.png';
import cloud8 from './clouds_08.png';
import cloud9 from './clouds_09.png';
import cloud10 from './clouds_10.png';
import cloud11 from './clouds_11.png';
import { ICloud } from '.';
export const cloudsConfig: ICloud[] = [
  {
    keyId: 1,
    bottom: '0',
    left: '0',
    background: cloud1,
    animDuration: '5s',
    animDirection: 'alternate',
    width: '927px',
    height: '297px',
  },
  {
    keyId: 2,
    top: '0',
    right: '0',
    background: cloud2,
    animDuration: '8s',
    animDirection: 'alternate-reverse',
    width: '740px',
    height: '346px',
  },
  {
    keyId: 3,
    top: '20%',
    right: '0px',
    background: cloud3,
    animDuration: '5s',
    animDirection: 'alternate-reverse',
    width: '351px',
    height: '374px',
    zIndex: 2,
  },
  {
    keyId: 4,
    top: '20%',
    left: '40px',
    background: cloud4,
    animDuration: '5s',
    animDirection: 'alternate-reverse',
    width: '805px',
    height: '346px',
  },
  {
    keyId: 5,
    bottom: '10%',
    left: '-10%',
    background: cloud5,
    animDuration: '8s',
    animDirection: 'alternate-reverse',
    width: '479px',
    height: '469px',
  },
  {
    keyId: 6,
    top: '5%',
    left: '40px',
    background: cloud6,
    animDuration: '5s',
    animDirection: 'alternate',
    width: '584px',
    height: '288px',
  },
  {
    keyId: 7,
    top: '0%',
    left: '-10%',
    background: cloud7,
    animDuration: '4s',
    animDirection: 'alternate-reverse',
    width: '600px',
    height: '261px',
  },

  {
    keyId: 8,
    bottom: '9%',
    left: '-10%',
    background: cloud8,
    animDuration: '8s',
    animDirection: 'alternate-reverse',
    width: '613px',
    height: '161px',
  },
  {
    keyId: 9,
    bottom: '0%',
    left: '-20%',
    background: cloud9,
    animDuration: '6s',
    animDirection: 'alternate',
    width: '1174px',
    height: '385px',
    zIndex: 2,
  },
  {
    keyId: 10,
    bottom: '-8%',
    right: '-30%',
    background: cloud10,
    animDuration: '5s',
    animDirection: 'alternate',
    width: '1264px',
    height: '584px',
    zIndex: 2,
  },
  //   {
  //     keyId: 11,
  //     top: '30%',
  //     right: '20%',
  //     background: cloud11,
  //     animDuration: '5s',
  //     animDirection: 'alternate-reverse',
  //     width: '805px',
  //     height: '346px',
  //   },
];

// width?: string;
//   height?: string;
//   background?: string;
//   animDuration?: string;
//   animDirection?: string;
//   top?: string;
//   left?: string;
//   right?: string;
//   bottom?: string;

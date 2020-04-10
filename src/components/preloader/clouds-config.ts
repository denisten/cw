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
    width: '64%',
    height: '37%',
    zIndex: 2,
  },
  {
    keyId: 2,
    top: '0',
    right: '0',
    background: cloud2,
    animDuration: '5s',
    animDirection: 'alternate-reverse',
    width: '51%',
    height: '43%',
  },
  {
    keyId: 3,
    top: '20%',
    right: '0px',
    background: cloud3,
    animDuration: '5s',
    animDirection: 'alternate-reverse',
    width: '25%',
    height: '46%',
    zIndex: 2,
  },
  {
    keyId: 4,
    top: '20%',
    left: '40px',
    background: cloud4,
    animDuration: '5s',
    animDirection: 'alternate-reverse',
    width: '56%',
    height: '43%',
  },
  {
    keyId: 5,
    bottom: '10%',
    left: '-10%',
    background: cloud5,
    animDuration: '8s',
    animDirection: 'alternate-reverse',
    width: '33%',
    height: '59%',
  },
  {
    keyId: 6,
    top: '5%',
    left: '40px',
    background: cloud6,
    animDuration: '5s',
    animDirection: 'alternate',
    width: '41%',
    height: '36%',
  },
  {
    keyId: 7,
    top: '0%',
    left: '-10%',
    background: cloud7,
    animDuration: '4s',
    animDirection: 'alternate-reverse',
    width: '42%',
    height: '33%',
  },

  {
    keyId: 8,
    bottom: '9%',
    left: '-10%',
    background: cloud8,
    animDuration: '8s',
    animDirection: 'alternate-reverse',
    width: '43%',
    height: '20%',
  },
  {
    keyId: 9,
    bottom: '0%',
    left: '-20%',
    background: cloud9,
    animDuration: '6s',
    animDirection: 'alternate',
    width: '82%',
    height: '48%',
    zIndex: 2,
  },
  {
    keyId: 10,
    bottom: '-8%',
    right: '-30%',
    background: cloud10,
    animDuration: '5s',
    animDirection: 'alternate',
    width: '88%',
    height: '70%',
    zIndex: 2,
  },
  {
    keyId: 11,
    top: '30%',
    right: '20%',
    background: cloud11,
    animDuration: '5s',
    animDirection: 'alternate-reverse',
    width: '56%',
    height: '43%',
  },
];

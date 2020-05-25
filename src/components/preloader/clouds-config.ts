import cloud1 from './clouds_01.png';
import cloud2 from './clouds_02.png';
import cloud3 from './clouds_03.png';
import cloud4 from './clouds_04.png';
import cloud5 from './clouds_05.png';
import cloud6 from './clouds_06.png';
import { ICloud } from '.';
import { keyframes } from 'styled-components';

const cloud1EndAnim = keyframes`
to {
    transform: translate3d(-100%, -50%, 0);
}
`;

const cloud2EndAnim = keyframes`
to {
    transform: translate3d(-100%, 0, 0);
}
`;
const cloud3EndAnim = keyframes`
to {
    transform: translate3d(-50%, 50%, 0);
}
`;
const cloud4EndAnim = keyframes`
to {
    transform: translate3d(100%, -50%, 0);
}
`;
const cloud5EndAnim = keyframes`
to {
    transform: translate3d(100%, 0, 0);
}
`;
const cloud6EndAnim = keyframes`
to {
    transform: translate3d(50%, 100%, 0);
}
`;
export const cloudsConfig: ICloud[] = [
  {
    keyId: 1,
    top: '0',
    left: '-10%',
    background: cloud1,
    animDuration: '4s',
    animDirection: 'alternate',
    width: '936px',
    height: '339px',
    zIndex: 4,
    endAnimation: cloud1EndAnim,
  },
  {
    keyId: 2,
    top: '17%',
    left: '-10%',
    background: cloud2,
    animDuration: '3s',
    animDirection: 'alternate',
    width: '606px',
    height: '488px',
    endAnimation: cloud2EndAnim,
  },
  {
    keyId: 3,
    bottom: '0%',
    left: '-20%',
    background: cloud3,
    animDuration: '5s',
    animDirection: 'alternate-reverse',
    width: '913px',
    height: '440px',
    zIndex: 4,
    endAnimation: cloud3EndAnim,
  },
  {
    keyId: 4,
    top: '0%',
    right: '-15%',
    background: cloud4,
    animDuration: '3s',
    animDirection: 'alternate',
    width: '769px',
    height: '422px',
    endAnimation: cloud4EndAnim,
  },
  {
    keyId: 5,
    top: '10%',
    right: '-10%',
    background: cloud5,
    animDuration: '4s',
    animDirection: 'alternate-reverse',
    width: '821px',
    height: '629px',
    endAnimation: cloud5EndAnim,
  },
  {
    keyId: 6,
    bottom: '0%',
    right: '0%',
    background: cloud6,
    animDuration: '3s',
    animDirection: 'alternate-reverse',
    width: '1137px',
    height: '315px',
    endAnimation: cloud6EndAnim,
  },
];

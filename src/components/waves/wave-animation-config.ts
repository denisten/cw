import { IWaveImg } from '.';
import wave1 from './wave1.png';
import wave2 from './wave2.png';
import { keyframes } from 'styled-components';

const topBackgroundAnim = keyframes`

to {
  background-position: left 0px top 241px;
}
`;
const topBackgroundAnimTwo = keyframes`

to {
  background-position: left 0px top 270px;
}
`;

const topBackgroundAnimThree = keyframes`

to {
  background-position: left 0px top 248px;
}
`;
const leftBackgroundAnim = keyframes`

to {background-position: left 446px top 0px;}
`;

const moveLayerAnim = keyframes`

0% {
  opacity: .6;
}

50% {
  opacity: 1;
  transform: translate3D(5px, 10px, 0);
}
70% {
  opacity: 0;
}

100% {
  opacity: 0;
  transform: translate3D(5px, 10px, 0);
}
`;

export const waveConfig: IWaveImg[] = [
  {
    width: '146px',
    height: '233px',
    top: '8.3%',
    left: '78.65%',
    animation: topBackgroundAnimThree,
    animationDuration: '12s',
    borderRadius: '0% 100% 70% 12% / 46% 43% 61% 14%',
    backgroundRepeat: 'repeat-y',
    background: wave1,
    backgroundSize: 'contain',
  },
  {
    width: '140px',
    height: '218px',
    top: '38.1%',
    left: '56.4%',
    animation: topBackgroundAnim,
    animationDuration: '12s',
    borderRadius: '0% 100% 70% 12% / 46% 43% 61% 14%',
    backgroundRepeat: 'repeat-y',
    background: wave1,
    backgroundSize: 'contain',
  },
  {
    width: '446px',
    height: '126px',
    top: '58.5%',
    left: '27%',
    animation: leftBackgroundAnim,
    animationDuration: '10s',
    backgroundRepeat: 'repeat-x',
    background: wave2,
    backgroundSize: '100% 100%',
    borderRadius: '95% 96% 37% 45% / 100% 100% 69% 65%',
    transform: 'rotate(150deg)',
  },

  {
    width: '45px',
    height: '40px',
    top: '65%',
    left: '22.45%',
    backgroundRepeat: 'no-repeat',
    background: wave1,
    backgroundSize: '100% 100%',
    animationDuration: '3s',
    animation: moveLayerAnim,
  },
  {
    width: '45px',
    height: '40px',
    top: '65.7%',
    left: '22.3%',
    backgroundRepeat: 'no-repeat',
    background: wave1,
    backgroundSize: '100% 100%',
    animationDuration: '3s',
    animationDelay: '1.5s',
    animation: moveLayerAnim,
  },

  {
    width: '158px',
    height: '205px',
    top: '70.1%',
    left: '25.6%',
    animation: topBackgroundAnimTwo,
    animationDuration: '12s',
    borderRadius: '0% 100% 70% 12% / 46% 43% 61% 14%',
    backgroundRepeat: 'repeat',
    background: wave1,
    backgroundSize: 'contain',
    transform: 'rotate(8deg)',
  },
];

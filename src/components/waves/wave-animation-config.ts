import { IWaveImg } from '.';
import wave1 from './wave1.png';
import wave2 from './wave2.png';
import wave3 from './wave3.png';
import { keyframes } from 'styled-components';

const moveBackground = keyframes`
0% {
  opacity: 0.2;
}
15% {
  opacity: 1;
}
85% {
  opacity: 1;
}
100% {
  opacity: 0;
  background-position: left 0px top 80px;
}
`;
const moveImgOne = keyframes`

0% {
  opacity: .6;
}

50% {
  opacity: 1;
  transform: translate3D(-15px, 15px, 0);
}
70% {
  opacity: 0;
}

100% {
  opacity: 0;
  transform: translate3D(-15px, 15px, 0);
}
`;

const moveImgTwo = keyframes`

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
    width: '140px',
    height: '218px',
    top: '38.1%',
    left: '56.4%',
    animation: moveBackground,
    animationDuration: '4s',
    borderRadius: '0% 100% 70% 12% / 46% 43% 61% 14%',
    backgroundRepeat: 'repeat',
    background: wave1,
    backgroundSize: 'contain',
  },
  {
    width: '143px',
    height: '132px',
    top: '39.6%',
    left: '56.5%',
    background: wave2,
  },
  {
    width: '246px',
    height: '122px',
    top: '37.3%',
    left: '56.2%',
    background: wave3,
  },
  {
    width: '127px',
    height: '112px',
    top: '57.8%',
    left: '30.4%',
    animation: moveImgOne,
    animationDuration: '3s',
    backgroundRepeat: 'no-repeat',
    background: wave1,
    backgroundSize: '100% 100%',
  },
  {
    width: '110px',
    height: '100px',
    top: '59.1%',
    left: '29%',
    animation: moveImgOne,
    animationDuration: '3s',
    animationDelay: '1.5s',
    backgroundRepeat: 'no-repeat',
    background: wave1,
    backgroundSize: '100% 100%',
  },
  {
    width: '177px',
    height: '148px',
    top: '57.8%',
    left: '29.7%',
    background: wave2,
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
    animation: moveImgTwo,
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
    animation: moveImgTwo,
  },

  {
    width: '158px',
    height: '205px',
    top: '70.1%',
    left: '25.6%',
    animation: moveBackground,
    animationDuration: '4s',
    borderRadius: '0% 100% 70% 12% / 46% 43% 61% 14%',
    backgroundRepeat: 'repeat',
    background: wave1,
    backgroundSize: 'contain',
    transform: 'rotate(8deg)',
  },
  {
    width: '142px',
    height: '236px',
    top: '69.4%',
    left: '25.6%',
    background: wave2,
    transform: 'rotate(26deg)',
  },
];

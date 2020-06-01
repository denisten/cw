import React from 'react';
import wave1 from './wave1.png';
import wave2 from './wave2.png';
import wave3 from './wave3.png';
import styled, { keyframes, Keyframes } from 'styled-components';

const testAnim = keyframes`

0% {
  background-position: left 0px top 0px ;
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
  background-position: left 0px top 160px;
}
`;

const WaveImg = styled.div<IWaveImg>`
  width: ${props => props.width};
  height: ${props => props.height};
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  z-index: 500;
  transform: ${props => props.transform};
  animation: ${props => props.animation} infinite linear;
  animation-duration: ${props => props.animationDuration || '4s'};
  animation-delay: ${props => props.animationDelay};
  animation-direction: ${props => props.animationDirection};
  background: url(${props => props.background});
  background-size: ${props => props.backgroundSize || '100% 100%'};
  background-repeat: ${props => props.backgroundRepeat || 'no-repeat'};
  border-radius: ${props => props.borderRadius || '0px'};
  animation-fill-mode: both;
`;

const testAnim2 = keyframes`

0% {
  opacity: .6;
}

50% {
  opacity: 1;
  transform: translate3D(-15px, 15px, 0);
  /* transform: translate3D(-40px, 10px, 0); */
}
70% {
  opacity: 0;
}

100% {
  opacity: 0;
  transform: translate3D(-15px, 15px, 0);
  /* transform: translate3D(-40px, 10px, 0); */
}
`;

const testAnim3 = keyframes`

0% {
  opacity: .6;
}

50% {
  opacity: 1;
  transform: translate3D(5px, 10px, 0);
  /* transform: translate3D(-40px, 10px, 0); */
}
70% {
  opacity: 0;
}

100% {
  opacity: 0;
  transform: translate3D(5px, 10px, 0);
  /* transform: translate3D(-40px, 10px, 0); */
}
`;

const mockConfig: IWaveImg[] = [
  {
    width: '140px',
    height: '218px',
    top: '38.1%',
    left: '56.4%',
    animation: testAnim,
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
    animation: testAnim2,
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
    animation: testAnim2,
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
    animation: testAnim3,
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
    animation: testAnim3,
  },

  {
    width: '140px',
    height: '218px',
    top: '65.7%',
    left: '22.3%',
    animation: testAnim,
    animationDuration: '4s',
    borderRadius: '0% 100% 70% 12% / 46% 43% 61% 14%',
    backgroundRepeat: 'repeat',
    background: wave1,
    backgroundSize: 'contain',
  },
];

export const Waves: React.FC = React.memo(() => {
  return (
    <>
      {mockConfig.map((waveParams, ind) => (
        <WaveImg key={ind} {...waveParams} />
      ))}
    </>
  );
});

interface IWaveImg {
  width: string;
  height: string;
  top: string;
  left: string;
  transform?: string;
  animation?: Keyframes;
  animationDelay?: string;
  animationDuration?: string;
  animationDirection?: string;
  background?: string;
  backgroundRepeat?: string;
  borderRadius?: string;
  backgroundSize?: string;
}

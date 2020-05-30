import React from 'react';
import wave1 from './wave1.png';
import wave2 from './wave2.png';
import wave3 from './wave3.png';
import styled, { keyframes, Keyframes } from 'styled-components';

const testAnim = keyframes`
0% {
    opacity: 1;
    transform: translate3d(-15px, -27px, 0px) scale(0.85);
    /* transform: translate3d(-25px, -62px, 0px) scale(0.75) ; */
}
50% {
    opacity: 1;
}


100% {
    opacity : 0;
    transform: translate3D(0px, 30px, 0) perspective(100px) rotate3d(1, 0, 1, 5deg) skew(-25.5deg);
    
}
`;

const testAnim2 = keyframes`
to {
  transform: scale(0.9) skew(-15deg);
  opacity: 0.8;
}

`;

const WaveImg = styled.img<IWaveImg>`
  width: ${props => props.width};
  height: ${props => props.height};
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  z-index: 500;
  transform: ${props => props.transform};
  animation: ${props => props.animation} infinite;
  animation-duration: ${props => props.animationDuration || '4s'};
  animation-delay: ${props => props.animationDelay};
  animation-direction: ${props => props.amimationDirection};
`;

const mockConfig: IWaveImg[] = [
  {
    width: '128px',
    height: '174px',
    top: '38.4%',
    left: '56.5%',
    animation: testAnim,
  },
  {
    width: '165px',
    height: '157px',
    top: '38.7%',
    left: '56.4%',
    animation: testAnim2,
    animationDuration: '2s',
    amimationDirection: 'alternate-reverse',
  },
  {
    width: '165px',
    height: '136px',
    top: '37.1%',
    left: '56.4%',
    animation: testAnim2,
    animationDuration: '4s',
    amimationDirection: 'alternate-reverse',
  },
  {
    width: '128px',
    height: '174px',
    top: '38.4%',
    left: '56.5%',
    animation: testAnim,
    animationDelay: '1s',
  },
];

export const Waves: React.FC = () => {
  return (
    <>
      <WaveImg {...mockConfig[0]} src={wave1} alt="wave"></WaveImg>
      <WaveImg {...mockConfig[1]} src={wave2} alt="wave"></WaveImg>
      <WaveImg {...mockConfig[2]} src={wave3} alt="wave"></WaveImg>
    </>
  );
};

interface IWaveImg {
  width: string;
  height: string;
  top: string;
  left: string;
  transform?: string;
  animation?: Keyframes;
  animationDelay?: string;
  animationDuration?: string;
  amimationDirection?: string;
}

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

25% {
  opacity: 1;
}
75% {
  opacity: 1;
}

100% {
  opacity: 0;
  background-position: left 0px top 242px;
}
`;

const testAnim2 = keyframes`
to {
  transform: scale(0.9) skew(-15deg);
  opacity: 0.8;
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
  background-size: 100% 100%;
  background-repeat: repeat-y;
  border-radius: 0% 100% 70% 12% / 46% 43% 61% 14%;
`;

const mockConfig: IWaveImg[] = [
  {
    width: '155px',
    height: '242px',
    top: '37.9%',
    left: '56.4%',
    animation: testAnim,
    animationDuration: '6s',
  },
  {
    width: '165px',
    height: '157px',
    top: '38.7%',
    left: '56.4%',
    // animation: testAnim2,
    // animationDuration: '2s',
    // animationDirection: 'alternate-reverse',
  },
  {
    width: '165px',
    height: '136px',
    top: '37.1%',
    left: '56.4%',
    // animation: testAnim2,
    // animationDuration: '4s',
    // animationDirection: 'alternate-reverse',
  },
];

export const Waves: React.FC = () => {
  return (
    <>
      <WaveImg {...mockConfig[0]} background={wave1}></WaveImg>
      <WaveImg {...mockConfig[1]} background={wave2}></WaveImg>
      <WaveImg {...mockConfig[2]} background={wave3}></WaveImg>
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
  animationDirection?: string;
  background?: string;
}

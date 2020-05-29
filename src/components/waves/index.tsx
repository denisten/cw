import React from 'react';
import wave1 from './wave1.png';
import wave2 from './wave2.png';
import wave3 from './wave3.png';
import styled, { keyframes, Keyframes } from 'styled-components';

const testAnim = keyframes`
0% {
    opacity: 1
}
50% {
    transform: translate3D(0px, 10px, 0)
}
100% {
    opacity : 0;
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
  animation: ${props => props.animation} 4s infinite;
  animation-delay: ${props => props.animationDelay};
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
    animation: testAnim,
    animationDelay: '4s',
  },
  {
    width: '165px',
    height: '136px',
    top: '37.1%',
    left: '56.4%',
    transform: 'rotate(-14deg)',
    animation: testAnim,
    animationDelay: '4s',
  },
];

export const Waves: React.FC = () => {
  return (
    <>
      <WaveImg {...mockConfig[0]} src={wave1} alt="wave"></WaveImg>
      {/* <WaveImg {...mockConfig[1]} src={wave2} alt="wave"></WaveImg>
      <WaveImg {...mockConfig[2]} src={wave3} alt="wave"></WaveImg> */}
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
}

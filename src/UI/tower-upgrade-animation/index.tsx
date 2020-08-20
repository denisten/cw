import React from 'react';

import line from './line.png';
import whiteLine from './whiteline.png';
import back from './back.png';
import circle from './circle.png';
import styled, { keyframes, Keyframes } from 'styled-components';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';

const Body = styled.div<ITowerUpgradeAnimation>`
  width: 85%;
  height: ${props => (props.wideTower ? '80%' : '60%')};
  align-self: flex-end;
  background: url(${back}) no-repeat center;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  z-index: ${ZIndexes.UPGRADE_TOWER_ANIMATION_CANVAS};
  position: relative;
  bottom: -5%;
`;

const Line = styled.img.attrs({ alt: 'line' })<IAnimationProps>`
  width: ${props => (props.wideTower ? '6%' : '10%')};
  height: 83%;
  position: relative;
  animation: ${props => props.animation} infinite linear;
`;

const line1Anim = keyframes`
0% {
  transform: translateY(0%);
  opacity: 0;
}
50% {
  transform: translateY(-10%);
  opacity: 1;
}

75% {
  transform: translateY(-30%);
  opacity: 0.9
}

100% {
  transform: translateY(-40%);
  opacity: 0
}
`;

const line2Anim = keyframes`
0% {
  transform: translateY(0%);
  opacity: 0;
}
50% {
  transform: translateY(-30%);
  opacity: 1;
}

75% {
  transform: translateY(-60%);
  opacity: 0.9
}

100% {
  transform: translateY(-50%);
  opacity: 0
}
`;

const line3Anim = keyframes`
0% {
  transform: translateY(0%);
  opacity: 0;
}
25% {
  transform: translateY(10%);
  opacity: 1;
}

50% {
  transform: translateY(30%);
  opacity: 1
}

75% {
  transform: translateY(0%);
  opacity: 0.9
}

100% {
  transform: translateY(-10%);
  opacity: 0
}
`;

const lineConfig: IConfig[] = [
  {
    style: {
      marginRight: '3%',
      position: 'absolute',
      left: '0%',
      bottom: '10%',
      animationDuration: '2s',
    },
    src: whiteLine,
    animation: line1Anim,
  },
  {
    style: {
      marginRight: '1%',
      marginLeft: '3%',
      bottom: '30%',
      animationDuration: '4s',
    },
    src: line,
    animation: line2Anim,
  },
  {
    style: { marginRight: '1.5%', animationDuration: '4s' },
    src: line,
    animation: line2Anim,
  },
  {
    style: { marginRight: '-1%', bottom: '60%', animationDuration: '2s' },
    src: line,
    animation: line3Anim,
  },
  {
    style: { marginRight: '-1.5%', bottom: '70%', animationDuration: '4s' },
    src: line,
    animation: line1Anim,
  },
  {
    style: { marginRight: '-1%', bottom: '15%', animationDuration: '4s' },
    src: line,
    animation: line3Anim,
  },
  {
    style: { marginRight: '-2%', bottom: '50%', animationDuration: '2s' },
    src: line,
    animation: line1Anim,
  },
  {
    style: { marginRight: '0%', bottom: '25%', animationDuration: '2s' },
    src: line,
    animation: line3Anim,
  },
  {
    style: {
      position: 'absolute',
      right: '0%',
      bottom: '10%',
      animationDuration: '2s',
    },
    src: whiteLine,
    animation: line1Anim,
  },
];

const circleAnimation = keyframes`
0% {
  opacity: 0;
  transform: translateY(0%);
}
25% {
  opacity: 1;
  transform: translateY(-20%);
}

50% {
  opacity: 1;
  transform: translateY(-40%);
}

75% {
  opacity: 0.75;
  transform: translateY(-50%) ;
}
100% {
  opacity: 0;
  transform: translateY(-60%) ;
}
`;

const Circle = styled.img.attrs({ alt: 'circle', src: circle })`
  width: 100%;

  position: absolute;
  bottom: 10%;
  animation: ${circleAnimation} 2s infinite linear;
`;

const circleConfig: IConfig[] = [
  { style: { bottom: '0%', width: '110%' } },
  { style: { bottom: '25%' } },
  { style: { bottom: '50%', width: '110%' } },
];

export const TowerUpgradeAnimation: React.FC<ITowerUpgradeAnimation> = ({
  wideTower,
}) => {
  return (
    <Body wideTower={wideTower}>
      {lineConfig.map((lineItem, ind) => (
        <Line
          key={ind}
          src={lineItem.src}
          style={lineItem.style}
          animation={lineItem.animation}
          wideTower={wideTower}
        />
      ))}
      {circleConfig.map((circleItem, ind) => (
        <Circle key={ind} style={circleItem.style} />
      ))}
    </Body>
  );
};

interface IConfig {
  style: React.CSSProperties;
  src?: string;
  animation?: Keyframes;
}
interface IAnimationProps {
  animation?: Keyframes;
  wideTower?: boolean;
}

interface ITowerUpgradeAnimation {
  wideTower: boolean;
}

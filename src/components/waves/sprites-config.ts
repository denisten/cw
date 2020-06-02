import { keyframes, Keyframes } from 'styled-components';

const animSpriteOne = keyframes`
0% {
  opacity: 0;
}

20% {
  opacity: 1;
}

100% {
  transform: translate3D(24px, 16px, 0)
}
`;

export const spriteWrapperConfig: ISpritesConfig[] = [
  {
    style: {
      top: '37.6%',
      left: '56.6%',
    },
    animation: animSpriteOne,
  },
  {
    style: {
      top: '40.2%',
      left: '56.2%',
    },
    animation: animSpriteOne,
  },
  {
    style: {
      top: '57.8%',
      left: '29.7%',
    },
    animation: animSpriteOne,
  },
];

export const mainSpriteSettings = {
  canvasWidth: 168,
  canvasHeight: 200,
  numberOfFramesX: 4,
  numberOfFramesY: 4,
  ticksPerFrame: 4,
  infinity: true,

  style: {
    width: '66px',
    height: '94px',
  } as React.CSSProperties,
};

interface ISpritesConfig {
  style: React.CSSProperties;
  animation: Keyframes;
}

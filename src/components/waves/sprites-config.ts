import { keyframes, Keyframes } from 'styled-components';

const animSpriteOne = keyframes`
0% {
  opacity: 0;
}

20% {
  opacity: 1;
}

100% {
  transform: translate3D(26px, 36px, 0);
}
`;

export const spriteWrapperConfig: ISpritesConfig[] = [
  {
    style: {
      top: '37.6%',
      left: '56.2%',
    },
    animation: animSpriteOne,
  },
  {
    style: {
      top: '41%',
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
  canvasWidth: 78,
  canvasHeight: 74,
  numberOfFramesX: 4,
  numberOfFramesY: 4,
  ticksPerFrame: 4,
  infinity: true,

  style: {
    width: '52px',
    height: '38px',
  } as React.CSSProperties,
};

interface ISpritesConfig {
  style: React.CSSProperties;
  animation?: Keyframes;
}

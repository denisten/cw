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

const animSpriteTwo = keyframes`
0% {
  opacity: 0;
}

20% {
  opacity: 1;
}

50% {
  transform: translate3D(10px, 24px, 0);
}

100% {
  transform: translate3D(0px, 48px, 0);
}
`;

const animSpriteThree = keyframes`
0% {
  opacity: 0;
}

20% {
  opacity: 1;
}

50% {
  transform: translate3D(-30px, 27px, 0);
}

100% {
  transform: translate3D(-38px, 49px, 0);
}
`;

const animSpriteFour = keyframes`
0% {
  opacity: 0;
}

20% {
  opacity: 1;
}

100% {
  transform: translate3D(-58px, 6px, 0);
}
`;
const animSpriteFive = keyframes`
0% {
  opacity: 0;
}

20% {
  opacity: 1;
}

100% {
  transform: translate3D(-36px, 37px, 0);
}
`;
const animSpriteSix = keyframes`
0% {
  opacity: 0;
}

20% {
  opacity: 1;
}

100% {
  transform: translate3D(-30px, 20px, 0);
}
`;

export const spriteWrapperConfig: ISpritesConfig[] = [
  {
    style: {
      top: '16.8%',
      left: '68.5%',
    },
    animation: animSpriteFour,
  },
  {
    style: {
      top: '3.2%',
      left: '75.9%',
    },
    animation: animSpriteThree,
  },
  {
    style: {
      top: '11.3%',
      left: '78.7%',
    },
    animation: animSpriteTwo,
  },
  {
    style: {
      top: '7.6%',
      left: '78.3%',
    },
    animation: animSpriteOne,
  },
  {
    style: {
      top: '37.6%',
      left: '56.2%',
    },
    animation: animSpriteOne,
  },
  {
    style: {
      top: '41.2%',
      left: '56.2%',
    },
    animation: animSpriteTwo,
  },
  {
    style: {
      top: '56.8%',
      left: '31.9%',
    },
    animation: animSpriteFive,
  },
  {
    style: {
      top: '64.6%',
      left: '22.8%',
    },
    animation: animSpriteThree,
  },
  {
    style: {
      top: '69.5%',
      left: '25.6%',
    },
    animation: animSpriteOne,
  },
  {
    style: {
      top: '72.5%',
      left: '25.6%',
    },
    animation: animSpriteTwo,
  },
  {
    style: {
      top: '78.2%',
      left: '14.4%',
    },
    animation: animSpriteSix,
  },
  {
    style: {
      top: '78.9%',
      left: '13.2%',
    },
    animation: animSpriteSix,
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

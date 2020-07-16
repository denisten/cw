import { keyframes } from 'styled-components';
import { ISpriteCollectionStyleConfig } from '../../sprite-collection';

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

30% {
  transform: translate3D(-68px, -6px, 0);
}

100% {
  transform: translate3D(-174px, 38px, 0);
}
`;

const shortAnimSprite = keyframes`
0% {
  opacity: 0;
}

20% {
  opacity: 1;
}

100% {
  transform: translate3D(-35px, 23px, 0);
}
`;

export const spriteWrapperConfig: ISpriteCollectionStyleConfig[] = [
  {
    style: {
      top: '16.8%',
      left: '68.5%',
      animationDuration: '7s',
    },
    animation: animSpriteSix,
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
      top: '32.5%',
      left: '53.9%',
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
      top: '37.1%',
      left: '56%',
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
      top: '60.7%',
      left: '27.7%',
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
      top: '69%',
      left: '25.25%',
    },
    animation: animSpriteOne,
  },
  {
    style: {
      top: '73.7%',
      left: '25.3%',
    },
    animation: shortAnimSprite,
  },
  {
    style: {
      top: '78.2%',
      left: '15.5%',
      animationDuration: '7s',
    },
    animation: animSpriteSix,
  },
];

export const mainSpriteSettings = {
  canvasWidth: 78,
  canvasHeight: 74,
  numberOfFramesX: 4,
  numberOfFramesY: 4,
  ticksPerFrame: 6,
  infinity: true,

  style: {
    width: '52px',
    height: '38px',
  } as React.CSSProperties,
};

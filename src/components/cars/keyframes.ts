import topLeftBg from './topLeft.png';
import topRightBg from './topRight.png';
import bottomLeftBg from './bottomLeft.png';
import bottomRightBg from './bottomRight.png';
import { keyframes } from 'styled-components';

const keyframesCreator = (
  iterationsArray: {
    animation: string[];
    percent?: string;
    transition?: boolean;
  }[]
) => {
  const maxPercent = 100;
  const minShiftForSmoothBackgroundChanges = 0.01;
  const iterationsWithPercent = iterationsArray.map((elem, index) => {
    if (index === 0) {
      elem['percent'] = '0';
    } else if (index === iterationsArray.length - 1) {
      elem['percent'] = '100';
    } else if (elem.transition) {
      elem['percent'] = (
        (maxPercent / iterationsArray.length) * (index + 1) -
        minShiftForSmoothBackgroundChanges
      ).toFixed(2);
    } else {
      elem['percent'] = ((maxPercent / iterationsArray.length) * index).toFixed(
        2
      );
    }
    return elem;
  });
  const generatedKeyframe = keyframes`${iterationsWithPercent
    .map(
      keyframesElem =>
        keyframesElem.percent +
        '%' +
        '{' +
        keyframesElem.animation.join(' ') +
        '}'
    )
    .join(' ')}`;
  return generatedKeyframe;
};

const iterationsForCarOne = [
  { animation: [`background: url(${topRightBg}) no-repeat center;`] },
  {
    animation: [`background: url(${topRightBg}) no-repeat center;`],
    transition: true,
  },
  {
    animation: [
      `transform: translate3d(1275px, -638px, 0);`,
      `background: url(${bottomRightBg}) no-repeat center;`,
    ],
  },
  {
    animation: [`background: url(${bottomRightBg}) no-repeat center;`],
    transition: true,
  },
  {
    animation: [
      `transform: translate3d(1550px, -500px, 0);`,
      `background: url(${topRightBg}) no-repeat center;`,
    ],
  },
  {
    animation: [`background: url(${topRightBg}) no-repeat center;`],
    transition: true,
  },
  {
    animation: [
      `transform: translate3d(1960px, -695px, 0);`,
      `background: url(${bottomLeftBg}) no-repeat center;`,
    ],
  },
  {
    animation: [`background: url(${bottomLeftBg}) no-repeat center;`],
    transition: true,
  },

  {
    animation: [
      `transform: translate3d(1550px, -500px, 0);`,
      `background: url(${topLeftBg}) no-repeat center;`,
    ],
  },
  {
    animation: [`background: url(${topLeftBg}) no-repeat center;`],
    transition: true,
  },

  {
    animation: [
      `transform: translate3d(1275px, -638px, 0);`,
      `background: url(${bottomLeftBg}) no-repeat center;`,
    ],
  },

  {
    animation: [
      `transform: translate3d(0, 0, 0);`,
      `background: url(${bottomLeftBg}) no-repeat center;`,
    ],
  },
];

const iterationsForCarTwo = [
  { animation: [`background: url(${topLeftBg}) no-repeat center`] },
  {
    animation: [`background: url(${topLeftBg}) no-repeat center`],
    transition: true,
  },
  {
    animation: [
      `transform: translate3d(-1995px,-997px, 0px);`,
      `background: url(${bottomRightBg}) no-repeat center;`,
    ],
  },
  {
    animation: [
      `transform:translate3d(0, 0, 0);`,
      `background: url(${bottomRightBg}) no-repeat center;`,
    ],
  },
];

const iterationsForCarThree = [
  { animation: [`background: url(${topLeftBg}) no-repeat center;`] },
  {
    animation: [`background: url(${topLeftBg}) no-repeat center;`],
    transition: true,
  },
  {
    animation: [
      `transform: translate3d(-486px,-248px, 0);`,
      `background: url(${topRightBg}) no-repeat center;`,
    ],
  },
  {
    animation: [`background: url(${topRightBg}) no-repeat center;`],
    transition: true,
  },
  {
    animation: [
      `transform: translate3d(40px,-515px, 0);`,
      `background: url(${topLeftBg}) no-repeat center;`,
    ],
  },
  {
    animation: [`background: url(${topLeftBg}) no-repeat center;`],
    transition: true,
  },
  {
    animation: [
      `transform: translate3d(-233px,-650px, 0);`,
      `background: url(${bottomRightBg}) no-repeat center;`,
    ],
  },
  {
    animation: [`background: url(${bottomRightBg}) no-repeat center;`],
    transition: true,
  },
  {
    animation: [
      `transform: translate3d(40px,-515px, 0);`,
      `background: url(${bottomLeftBg}) no-repeat center;`,
    ],
  },
  {
    animation: [`background: url(${bottomLeftBg}) no-repeat center;`],
    transition: true,
  },
  {
    animation: [
      `transform: translate3d(-486px,-248px, 0);`,
      `background: url(${bottomRightBg}) no-repeat center;`,
    ],
  },
  {
    animation: [
      `background: url(${bottomRightBg}) no-repeat center;`,
      `transform: translate3d(0px,0px, 0);`,
    ],
  },
];

export const animForCar1 = keyframesCreator(iterationsForCarOne);
export const animForCar2 = keyframesCreator(iterationsForCarTwo);
export const animForCar3 = keyframesCreator(iterationsForCarThree);

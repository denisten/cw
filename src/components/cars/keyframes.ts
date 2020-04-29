import topLeftBg from './topLeft.png';
import topRightBg from './topRight.png';
import bottomLeftBg from './bottomLeft.png';
import bottomRightBg from './bottomRight.png';
import { keyframes } from 'styled-components';

const keyframesCreator = (
  iterationsArray: { anim: string[]; percent?: string; transition?: boolean }[]
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
      animElem =>
        animElem.percent +
        '%' +
        '{' +
        animElem.anim.map(animation => animation).join(' ') +
        '}'
    )
    .join(' ')}`;
  return generatedKeyframe;
};

const iterationsForCarOne = [
  { anim: [`background: url(${topRightBg}) no-repeat center;`] },
  {
    anim: [`background: url(${topRightBg}) no-repeat center;`],
    transition: true,
  },
  {
    anim: [
      `transform: translate3d(1370px, -685px, 0);`,
      `background: url(${bottomLeftBg}) no-repeat center;`,
    ],
  },
  {
    anim: [
      `transform: translate3d(0, 0, 0);`,
      `background: url(${bottomLeftBg}) no-repeat center;`,
    ],
  },
];

export const animForCar1 = keyframesCreator(iterationsForCarOne);

// keyframes`
//            0% {

//              background: url(${topRightBg}) no-repeat center;
//           }
//           49% {
//           background: url(${topRightBg}) no-repeat center;

//           }
//           50% {
//             transform: translate3d(1370px, -685px, 0);
//              background: url(${bottomLeftBg}) no-repeat center;
//           }
//           99% {
//           background: url(${bottomLeftBg}) no-repeat center;
//           }
//           100% {
//             transform: translate3d(0, 0, 0);
//              background: url(${topRightBg}) no-repeat center;
//           }
// `;
const iterationsForCarTwo = [
  { anim: [`background: url(${topLeftBg}) no-repeat center`] },
  {
    anim: [`background: url(${topLeftBg}) no-repeat center`],
    transition: true,
  },
  {
    anim: [
      `transform: translate3d(-1995px,-997px, 0px);`,
      `background: url(${bottomRightBg}) no-repeat center;`,
    ],
  },
  {
    anim: [
      `transform:translate3d(0, 0, 0);`,
      `background: url(${bottomRightBg}) no-repeat center;`,
    ],
  },
];
export const animForCar2 = keyframesCreator(iterationsForCarTwo);
const iterationsForCarThree = [
  { anim: [`background: url(${topLeftBg}) no-repeat center;`] },
  {
    anim: [`background: url(${topLeftBg}) no-repeat center;`],
    transition: true,
  },
  {
    anim: [
      `transform: translate3d(-486px,-248px, 0);`,
      `background: url(${topRightBg}) no-repeat center;`,
    ],
  },
  {
    anim: [`background: url(${topRightBg}) no-repeat center;`],
    transition: true,
  },
  {
    anim: [
      `transform: translate3d(40px,-515px, 0);`,
      `background: url(${topLeftBg}) no-repeat center;`,
    ],
  },
  {
    anim: [`background: url(${topLeftBg}) no-repeat center;`],
    transition: true,
  },
  {
    anim: [
      `transform: translate3d(-233px,-650px, 0);`,
      `background: url(${bottomRightBg}) no-repeat center;`,
    ],
  },
  {
    anim: [`background: url(${bottomRightBg}) no-repeat center;`],
    transition: true,
  },
  {
    anim: [
      `transform: translate3d(40px,-515px, 0);`,
      `background: url(${bottomLeftBg}) no-repeat center;`,
    ],
  },
  {
    anim: [`background: url(${bottomLeftBg}) no-repeat center;`],
    transition: true,
  },
  {
    anim: [
      `transform: translate3d(-486px,-248px, 0);`,
      `background: url(${bottomRightBg}) no-repeat center;`,
    ],
  },
  {
    anim: [
      `background: url(${bottomRightBg}) no-repeat center;`,
      `transform: translate3d(0px,0px, 0);`,
    ],
  },
];

export const animForCar3 = keyframesCreator(iterationsForCarThree);

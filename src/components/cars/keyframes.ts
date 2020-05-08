import whiteTopLeft from './whiteTopLeft.png';
import whiteBottomRight from './whiteBottomRight.png';
import redTopLeft from './redTopLeft.png';
import redTopRight from './redTopRight.png';
import redBottomLeft from './redBottomLeft.png';
import redBottomRight from './redBottomRight.png';
import greenTopLeft from './greenTopLeft.png';
import greenTopRight from './greenTopRight.png';
import greenBottomLeft from './greenBottomLeft.png';
import greenBottomRight from './greenBottomRight.png';

import { keyframes } from 'styled-components';

const keyframesCreator = (iterationsArray: IiterationsArray[]) => {
  const maxPercent = 100;
  const minPercent = 0;
  const minShiftForSmoothBackgroundChanges = 0.01;
  const fieldName = 'percent';
  const iterationsWithPercent = iterationsArray.map((elem, index) => {
    if (index === 0) {
      elem[fieldName] = minPercent;
    } else if (index === iterationsArray.length - 1) {
      elem[fieldName] = maxPercent;
    } else if (elem.transition) {
      elem[fieldName] = Number(
        (
          (maxPercent / iterationsArray.length) * (index + 1) -
          minShiftForSmoothBackgroundChanges
        ).toFixed(2)
      );
    } else {
      elem[fieldName] = Number(
        ((maxPercent / iterationsArray.length) * index).toFixed(2)
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
  { animation: [`background: url(${redTopRight}) no-repeat center;`] },
  {
    animation: [`background: url(${redTopRight}) no-repeat center;`],
    transition: true,
  },
  {
    animation: [
      `transform: translate3d(1290px, -643px, 0);`,
      `background: url(${redBottomRight}) no-repeat center;`,
    ],
  },
  {
    animation: [`background: url(${redBottomRight}) no-repeat center;`],
    transition: true,
  },
  {
    animation: [
      `transform: translate3d(1560px, -504px, 0);`,
      `background: url(${redTopRight}) no-repeat center;`,
    ],
  },
  {
    animation: [`background: url(${redTopRight}) no-repeat center;`],
    transition: true,
  },
  {
    animation: [
      `transform: translate3d(1967px, -706px, 0);`,
      `background: url(${redBottomLeft}) no-repeat center;`,
    ],
  },
  {
    animation: [`background: url(${redBottomLeft}) no-repeat center;`],
    transition: true,
  },

  {
    animation: [
      `transform: translate3d(1560px, -504px, 0);`,
      `background: url(${redTopLeft}) no-repeat center;`,
    ],
  },
  {
    animation: [`background: url(${redTopLeft}) no-repeat center;`],
    transition: true,
  },

  {
    animation: [
      `transform: translate3d(1290px, -643px, 0);`,
      `background: url(${redBottomLeft}) no-repeat center;`,
    ],
  },

  {
    animation: [
      `transform: translate3d(0, 0, 0);`,
      `background: url(${redBottomLeft}) no-repeat center;`,
    ],
  },
];

const iterationsForCarTwo = [
  { animation: [`background: url(${whiteTopLeft}) no-repeat center`] },
  {
    animation: [`background: url(${whiteTopLeft}) no-repeat center`],
    transition: true,
  },
  {
    animation: [
      `transform: translate3d(-1995px,-997px, 0px);`,
      `background: url(${whiteBottomRight}) no-repeat center;`,
    ],
  },
  {
    animation: [
      `transform:translate3d(0, 0, 0);`,
      `background: url(${whiteBottomRight}) no-repeat center;`,
    ],
  },
];

const iterationsForCarThree = [
  { animation: [`background: url(${greenTopLeft}) no-repeat center;`] },
  {
    animation: [`background: url(${greenTopLeft}) no-repeat center;`],
    transition: true,
  },
  {
    animation: [
      `transform: translate3d(-486px,-248px, 0);`,
      `background: url(${greenTopRight}) no-repeat center;`,
    ],
  },
  {
    animation: [`background: url(${greenTopRight}) no-repeat center;`],
    transition: true,
  },
  {
    animation: [
      `transform: translate3d(40px,-515px, 0);`,
      `background: url(${greenTopLeft}) no-repeat center;`,
    ],
  },
  {
    animation: [`background: url(${greenTopLeft}) no-repeat center;`],
    transition: true,
  },
  {
    animation: [
      `transform: translate3d(-233px,-650px, 0);`,
      `background: url(${greenBottomRight}) no-repeat center;`,
    ],
  },
  {
    animation: [`background: url(${greenBottomRight}) no-repeat center;`],
    transition: true,
  },
  {
    animation: [
      `transform: translate3d(40px,-515px, 0);`,
      `background: url(${greenBottomLeft}) no-repeat center;`,
    ],
  },
  {
    animation: [`background: url(${greenBottomLeft}) no-repeat center;`],
    transition: true,
  },
  {
    animation: [
      `transform: translate3d(-486px,-248px, 0);`,
      `background: url(${greenBottomRight}) no-repeat center;`,
    ],
  },
  {
    animation: [
      `background: url(${greenBottomRight}) no-repeat center;`,
      `transform: translate3d(0px,0px, 0);`,
    ],
  },
];

const iterationsForCarFour = [
  { animation: [`background: url(${redTopLeft}) no-repeat center;`] },
  {
    animation: [`background: url(${redTopLeft}) no-repeat center;`],
    transition: true,
  },
  {
    animation: [
      `transform: translate3d(-102px,-45px,0px);`,
      `background: url(${redBottomLeft}) no-repeat center;`,
    ],
  },
  {
    animation: [`background: url(${redBottomLeft}) no-repeat center;`],
    transition: true,
  },
  {
    animation: [
      `transform: translate3d(-169px,-2px,0px);`,
      `background: url(${redBottomRight}) no-repeat center;`,
    ],
  },
  {
    animation: [`background: url(${redBottomRight}) no-repeat center;`],
    transition: true,
  },

  {
    animation: [
      `transform: translate3d(280px,225px,0px);`,
      `background: url(${redBottomLeft}) no-repeat center;`,
    ],
  },
  {
    animation: [`background: url(${redBottomLeft}) no-repeat center;`],
    transition: true,
  },
  {
    animation: [
      `transform: translate3d(-195px,465px,0px);`,
      `background: url(${redBottomRight}) no-repeat center;`,
    ],
  },
  {
    animation: [`background: url(${redBottomRight}) no-repeat center;`],
    transition: true,
  },
  {
    animation: [
      `transform: translate3d(345px,735px,0px);`,
      `background: url(${redTopRight}) no-repeat center;`,
    ],
  },
  {
    animation: [`background: url(${redTopRight}) no-repeat center;`],
    transition: true,
  },
  {
    animation: [
      `transform: translate3d(812px,490px,0px);`,
      `background: url(${redTopLeft}) no-repeat center;`,
    ],
  },
  {
    animation: [`background: url(${redTopLeft}) no-repeat center;`],
    transition: true,
  },
  {
    animation: [
      `transform: translate3d(-168px,-3px,0px);`,
      `background: url(${redTopRight}) no-repeat center;`,
    ],
  },
  {
    animation: [`background: url(${redTopRight}) no-repeat center;`],
    transition: true,
  },
  {
    animation: [
      `transform: translate3d(-101px,-48px,0px);`,
      `background: url(${redBottomRight}) no-repeat center;`,
    ],
  },
  {
    animation: [`background: url(${redBottomRight}) no-repeat center;`],
    transition: true,
  },
  {
    animation: [
      `transform: translate3d(0px,0px,0px);`,
      `background: url(${redBottomRight}) no-repeat center;`,
    ],
  },
];

export const animForCar1 = keyframesCreator(iterationsForCarOne);
export const animForCar2 = keyframesCreator(iterationsForCarTwo);
export const animForCar3 = keyframesCreator(iterationsForCarThree);
export const animForCar4 = keyframesCreator(iterationsForCarFour);

interface IiterationsArray {
  animation: string[];
  percent?: number;
  transition?: boolean;
}

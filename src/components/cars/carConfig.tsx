import { animForCar1, animForCar2, animForCar3 } from './keyframes';
export const carConfig = [
  {
    id: 1,
    carStyle: {
      animDuration: '20s',
      animationTimingFunction: 'ease-in-out',
      animationName: animForCar1,
      left: '21.78%',
      top: '46%',
    },
  },
  {
    id: 2,
    carStyle: {
      animDuration: '23s',
      animationTimingFunction: 'ease-in-out',
      animationName: animForCar2,
      left: '54.4%',
      top: '37.1%',
    },
  },
  {
    id: 3,
    carStyle: {
      animDuration: '25s',
      animationTimingFunction: 'ease-in-out',
      animationName: animForCar3,
      left: '56.1%',
      top: '52.95%',
    },
  },
];

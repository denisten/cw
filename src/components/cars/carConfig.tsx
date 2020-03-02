import { animForCar1, animForCar2, animForCar3 } from './keyframes';
export const carConfig = [
  {
    id: 1,
    carStyle: {
      animDuration: '9s',
      animationTimingFunction: 'ease-in-out',
      animationName: animForCar1,
    },
  },
  {
    id: 2,
    carStyle: {
      animDuration: '8s',
      animationTimingFunction: 'ease-in-out',
      animationName: animForCar2,
    },
  },
  {
    id: 3,
    carStyle: {
      animDuration: '18s',
      animationTimingFunction: 'ease-in-out',
      animationName: animForCar3,
    },
  },
];

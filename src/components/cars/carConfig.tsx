import {
  animForCar1,
  animForCar2,
  animForCar3,
  animForCar4,
  animCarMed,
} from './keyframes';
export const carConfig = [
  {
    id: 1,
    carStyle: {
      animDuration: '30s',
      animationTimingFunction: 'ease-in-out',
      animationName: animForCar1,
      left: '21.78%',
      top: '46.25%',
    },
  },
  {
    id: 2,
    carStyle: {
      animDuration: '23s',
      animationTimingFunction: 'ease-in-out',
      animationName: animForCar2,
      left: '54.4%',
      top: '37.23%',
    },
  },
  {
    id: 3,
    carStyle: {
      animDuration: '25s',
      animationTimingFunction: 'ease-in-out',
      animationName: animForCar3,
      left: '56.1%',
      top: '53.06%',
    },
  },
  {
    id: 4,
    carStyle: {
      animDuration: '43s',
      animationTimingFunction: 'ease-in-out',
      animationName: animForCar4,
      top: '34.9%',
      left: '59.3%',
    },
  },
  {
    id: 5,
    carStyle: {
      animDuration: '25s',
      animationTimingFunction: 'ease-in-out',
      animationName: animCarMed,
      top: '63.9%',
      left: '71.3%',
      height: '41px',
      width: '54px',
    },
  },
];

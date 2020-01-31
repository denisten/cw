import { updateFocusOnValue } from '../../effector/app-condition/events';
import { divideNumber } from '../../components/root-component/root-component';

export const OnEndScrollHandler = ([xPos, yPos]: number[]) => {
  updateFocusOnValue([
    xPos + window.innerWidth / divideNumber.WIDTH,
    yPos + window.innerHeight / divideNumber.HEIGHT,
  ]);
};

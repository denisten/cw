import {
  ScaleValues,
  updateScaleValue,
} from '../../effector/app-condition/events';

export const zoomInOut = (directionNumber: number, scaleValue: number) => {
  if (
    directionNumber < 0 &&
    scaleValue + ScaleValues.SCALE_STEP <= ScaleValues.MAX_SCALE
  ) {
    updateScaleValue(ScaleValues.SCALE_STEP);
  } else if (
    directionNumber > 0 &&
    scaleValue - ScaleValues.SCALE_STEP >= ScaleValues.MIN_SCALE
  ) {
    updateScaleValue(-ScaleValues.SCALE_STEP);
  }
};

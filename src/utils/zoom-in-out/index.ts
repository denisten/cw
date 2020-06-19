import {
  ScaleValues,
  updateScaleValue,
} from '../../effector/app-condition/events';

export const scaleHandler = (scaleValue: number, payload: number) => {
  if (
    payload < 0 &&
    scaleValue + (payload || ScaleValues.SCALE_STEP) >= ScaleValues.MIN_SCALE
  ) {
    updateScaleValue(payload || -ScaleValues.SCALE_STEP);
  } else if (
    payload > 0 &&
    scaleValue + (payload || ScaleValues.SCALE_STEP) <= ScaleValues.MAX_SCALE
  ) {
    updateScaleValue(payload || ScaleValues.SCALE_STEP);
  }
};

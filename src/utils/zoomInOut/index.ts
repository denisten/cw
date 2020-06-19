import {
  ScaleValues,
  updateScaleValue,
} from '../../effector/app-condition/events';
import { ScaleDirection } from '../../UI/zoom-in-out-buttons';

export const scaleHandler = (direction: ScaleDirection, scaleValue: number) => {
  if (
    direction === ScaleDirection.ZOOM_OUT &&
    scaleValue - ScaleValues.SCALE_STEP >= ScaleValues.MIN_SCALE
  ) {
    updateScaleValue(-ScaleValues.SCALE_STEP);
  } else if (
    direction === ScaleDirection.ZOOM_IN &&
    scaleValue + ScaleValues.SCALE_STEP <= ScaleValues.MAX_SCALE
  ) {
    updateScaleValue(ScaleValues.SCALE_STEP);
  }
};

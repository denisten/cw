import React from 'react';
import styled from 'styled-components';
import {
  ScaleValues,
  updateScaleValue,
} from '../../effector/app-condition/events';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 55px;
  height: 55px;
  background: red;
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 1;
`;

export const ZoomInOut: React.FC<IZoomInOut> = ({ scaleValue }) => {
  const zoomInOutHandler = (zoomStep: number) => {
    if (
      zoomStep > 0 &&
      scaleValue + ScaleValues.SCALE_STEP <= ScaleValues.MAX_SCALE
    ) {
      updateScaleValue(ScaleValues.SCALE_STEP);
    } else if (
      zoomStep < 0 &&
      scaleValue - ScaleValues.SCALE_STEP >= ScaleValues.MIN_SCALE
    ) {
      updateScaleValue(-ScaleValues.SCALE_STEP);
    }
  };
  return (
    <ButtonContainer>
      <span onClick={() => zoomInOutHandler(1)}>+</span>
      <span onClick={() => zoomInOutHandler(-1)}>-</span>
    </ButtonContainer>
  );
};

interface IZoomInOut {
  scaleValue: number;
}

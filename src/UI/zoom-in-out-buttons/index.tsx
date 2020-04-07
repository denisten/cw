import React from 'react';
import styled from 'styled-components';
import { zoomInOut } from '../../utils/zoomInOut';

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

export const ZoomInOutButtons: React.FC<IZoomInOutButtons> = ({
  scaleValue,
}) => {
  return (
    <ButtonContainer>
      <span onClick={() => zoomInOut(-1, scaleValue)}>+</span>
      <span onClick={() => zoomInOut(1, scaleValue)}>-</span>
    </ButtonContainer>
  );
};

interface IZoomInOutButtons {
  scaleValue: number;
}

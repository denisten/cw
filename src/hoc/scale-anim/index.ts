import { keyframes } from 'styled-components';

export const scaleAnimation = (scaleSize: number) => keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(${scaleSize});
  }
`;

export const defaultScaleSize = 1.1;

import { keyframes } from 'styled-components';

export const scaleAnimation = (scaleSize: number) => keyframes`
  from {
    transform: scale(1);
  }
  50% {
    transform: scale(${scaleSize});
  }
  to {
    transform: scale(1);
  }
`;

export const defaultScaleSize = 1.05;

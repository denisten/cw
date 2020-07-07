import { keyframes } from 'styled-components';

export const pulseAnimationHOF = (bcg: string) => {
  return keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(${bcg}, 0.4);
  }
  70% {
      box-shadow: 0 0 0 15px rgba(${bcg}, 0);
  }
  100% {
      box-shadow: 0 0 0 0 rgba(${bcg}, 0);
  }
`;
};

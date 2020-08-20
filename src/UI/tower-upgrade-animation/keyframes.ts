import { keyframes } from 'styled-components';

export const line1Anim = keyframes`
0% {
  transform: translateY(0%);
  opacity: 0;
}
50% {
  transform: translateY(-10%);
  opacity: 1;
}

75% {
  transform: translateY(-30%);
  opacity: 0.9
}

100% {
  transform: translateY(-40%);
  opacity: 0
}
`;

export const line2Anim = keyframes`
0% {
  transform: translateY(0%);
  opacity: 0;
}
50% {
  transform: translateY(-30%);
  opacity: 1;
}

75% {
  transform: translateY(-60%);
  opacity: 0.9
}

100% {
  transform: translateY(-50%);
  opacity: 0
}
`;

export const line3Anim = keyframes`
0% {
  transform: translateY(0%);
  opacity: 0;
}
25% {
  transform: translateY(10%);
  opacity: 1;
}

50% {
  transform: translateY(30%);
  opacity: 1
}

75% {
  transform: translateY(0%);
  opacity: 0.9
}

100% {
  transform: translateY(-10%);
  opacity: 0
}
`;

export const circleAnimation = keyframes`
0% {
  opacity: 0;
  transform: translateY(0%);
}
25% {
  opacity: 1;
  transform: translateY(-20%);
}

50% {
  opacity: 1;
  transform: translateY(-40%);
}

75% {
  opacity: 0.75;
  transform: translateY(-50%) ;
}
100% {
  opacity: 0;
  transform: translateY(-60%) ;
}
`;

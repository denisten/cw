import topLeftBg from './topLeft.png';
import topRightBg from './topRight.png';
import bottomLeftBg from './bottomLeft.png';
import bottomRightBg from './bottomRight.png';
import { keyframes } from 'styled-components';
export const animForCar1 = keyframes`
           0% {

             background: url(${topRightBg}) no-repeat center;
          }
          49% {
          background: url(${topRightBg}) no-repeat center;

          }
          50% {
            transform: translate3d(1370px, -685px, 0);
             background: url(${bottomLeftBg}) no-repeat center;
          }
          99% {
          background: url(${bottomLeftBg}) no-repeat center;
          }
          100% {
            transform: translate3d(0, 0, 0);
             background: url(${topRightBg}) no-repeat center;
          }
`;

export const animForCar2 = keyframes`
          0% {
             background: url(${topLeftBg}) no-repeat center;
          }
          49% {
          background: url(${topLeftBg}) no-repeat center;
          }
          50% {
            transform: translate3d(-1995px,-997px, 0px);
            background: url(${bottomRightBg}) no-repeat center;
          }
           99% {
        background: url(${bottomRightBg}) no-repeat center;
          }
        100% {
          transform:translate3d(0, 0, 0);
          background: url(${bottomRightBg}) no-repeat center;
        }
`;
export const animForCar3 = keyframes`
          0% {
             background: url(${topLeftBg}) no-repeat center;
          }

          14.99% {
            background: url(${topLeftBg}) no-repeat center;
          }
          15% {
            transform: translate3d(-486px,-248px, 0);
            background: url(${topRightBg}) no-repeat center;
          }

          29.99% {
            background: url(${topRightBg}) no-repeat center;
          }
          30% {
            transform: translate3d(40px,-515px, 0);
            background: url(${topLeftBg}) no-repeat center;
          }

          44.99% {
          background: url(${topLeftBg}) no-repeat center;
          }
          45% {
            transform: translate3d(-233px,-650px, 0);
            background: url(${bottomRightBg}) no-repeat center;
          }

          59.99% {
            background: url(${bottomRightBg}) no-repeat center;
          }
          60% {
            transform: translate3d(40px,-515px, 0);
            background: url(${bottomLeftBg}) no-repeat center;
          }

          74.99% {
            background: url(${bottomLeftBg}) no-repeat center;
          }
          75% {
            transform: translate3d(-486px,-248px, 0);
            background: url(${bottomRightBg}) no-repeat center;
          }
          100% {
            background: url(${bottomRightBg}) no-repeat center;
            transform: translate3d(0px,0px, 0);
          }
`;

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
            transform: translate3d(860px, -420px, 0);
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
             background: url(${bottomRightBg}) no-repeat center;
          }
          49% {
          background: url(${bottomRightBg}) no-repeat center;
          }
          50% {
            transform: translate3d(515px,260px, 0px);
            background: url(${topLeftBg}) no-repeat center;
          }
           99% {
        background: url(${topLeftBg}) no-repeat center;
          }
        100% {
          transform:translate3d(0, 0, 0);
          background: url(${bottomRightBg}) no-repeat center;
        }
`;
export const animForCar3 = keyframes`
          0% {
             background: url(${bottomRightBg}) no-repeat center;
          }
          49% {
          background: url(${bottomRightBg}) no-repeat center;
          }
          50% {
            transform: translate3d(1075px, 540px, 0);
             background: url(${topLeftBg}) no-repeat center;
          }
        99% {
        background: url(${topLeftBg}) no-repeat center;

        }
        100% {
          background: url(${bottomRightBg}) no-repeat center;
          transform: translate3d(0,0,0);
        }
`;

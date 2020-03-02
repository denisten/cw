import topLeftBg from './topLeft.png';
import topRightBg from './topRight.png';
import bottomLeftBg from './bottomLeft.png';
import bottomRightBg from './bottomRight.png';
import { keyframes } from 'styled-components';
export const animForCar1 = keyframes`
           0% {
            left: 25.5%;
            top: 45.2%;
             background: url(${topRightBg}) no-repeat center;
          }
          49% {
          background: url(${topRightBg}) no-repeat center;
          display: flex;
          }
          50% {
            left: 36.1%;
            top: 38%;
             background: url(${bottomLeftBg}) no-repeat center;
             display: none;
          }
          99% {
          background: url(${bottomLeftBg}) no-repeat center;
          display: flex;
          }
          
          100% {
            left: 25.5%;
            top: 45.2%;
             background: url(${topRightBg}) no-repeat center;
          display: none;
          }
`;

export const animForCar2 = keyframes`
          0% {
            left: 35.4%;
            top: 39.2%;
             background: url(${bottomRightBg}) no-repeat center;
          }
          49% {
          background: url(${bottomRightBg}) no-repeat center;
          display: flex;
          }
          50% {
            left: 42.4%;
            top: 44.3%;
             background: url(${topLeftBg}) no-repeat center;
          display: none;
          }
          99% {
        background: url(${topLeftBg}) no-repeat center;
        display: flex;
          }
        100% {
          left: 35.4%;
          top: 39.2%;
          background: url(${bottomRightBg}) no-repeat center;
          display: none;
        }
`;
export const animForCar3 = keyframes`
          0% {
            left: 58.4%;
            top: 48.2%;
             background: url(${bottomRightBg}) no-repeat center;
            
          }
          49% {
          background: url(${bottomRightBg}) no-repeat center;
          
          display: flex;
          }
          50% {
            left: 72.6%;
            top: 58.1%;
             background: url(${topLeftBg}) no-repeat center;
          display: none;
          }
        99% {
        background: url(${topLeftBg}) no-repeat center;
        
          display: flex;
        }
        100% {
          left: 58.1%;
          top: 48.2%;
          background: url(${bottomRightBg}) no-repeat center;
          
          display: none;
        }
`;

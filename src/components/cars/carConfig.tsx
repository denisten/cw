import topLeftBg from './topLeft.png';
import topRightBg from './topRight.png';
import bottomLeftBg from './bottomLeft.png';
import bottomRightBg from './bottomRight.png';
export const carConfig = [
         {
           id: 1,
           carStyle: {
             animDuration: '9s',
             animationTimingFunction: 'ease-in-out',
             animationDirection: 'normal',
             animationIterationCount: 1,
           },
           animationStartParams: `
           0% {
            left: 25.5%;
            top: 45.2%;
             background: url(${topRightBg}) no-repeat center;
          }
          99% {
          background: url(${topRightBg}) no-repeat center;
          }
          100% {
            left: 35.6%;
            top: 38.1%;
             background: url(${bottomLeftBg}) no-repeat center;
          }
         `,
         animationEndParams: `
         0% {
            left: 35.6%;
            top: 38.1%;
             background: url(${bottomLeftBg}) no-repeat center;
          }
          99% {
          background: url(${bottomLeftBg}) no-repeat center;
          }
          100% {
            left: 25.5%;
            top: 45.2%;
             background: url(${topRightBg}) no-repeat center;
          }
         `,
         },
         {
          id: 2,
          carStyle: {
            animDuration: '8s',
            animationTimingFunction: 'ease-in-out',
            animationDirection: 'normal',
            animationIterationCount: 1,
          },
          animationStartParams: `
          0% {
            left: 35%;
            top: 38.5%;
             background: url(${bottomRightBg}) no-repeat center;
          }
          99% {
          background: url(${bottomRightBg}) no-repeat center;
          }
          100% {
            left: 42.4%;
            top: 44.5%;
             background: url(${topLeftBg}) no-repeat center;
          }
        `,
        animationEndParams: `
        0% {
          left: 42.4%;
          top: 44.5%;
            background: url(${topLeftBg}) no-repeat center;
        }
        99% {
        background: url(${topLeftBg}) no-repeat center;
        }
        100% {
          left: 35%;
          top: 38.5%;
          background: url(${bottomRightBg}) no-repeat center;
        }
        `,
        },
        {
          id: 3,
          carStyle: {
            animDuration: '8s',
            animationTimingFunction: 'ease-in-out',
            animationDirection: 'normal',
            animationIterationCount: 1,
          },
          animationStartParams: `
          0% {
            left: 73.4%;
            top: 38.5%;
             background: url(${topRightBg}) no-repeat center;
          }
          99% {
          background: url(${topRightBg}) no-repeat center;
          }
          100% {
            left: 65.4.4%;
            top: 32.5%;
             background: url(${topLeftBg}) no-repeat center;
          }
        `,
        animationEndParams: `
        0% {
          left: 65.4.4%;
            top: 32.5%;
            background: url(${topLeftBg}) no-repeat center;
        }
        99% {
        background: url(${topLeftBg}) no-repeat center;
        }
        100% {
          left: 73.4%;
          top: 38.5%;
          background: url(${topRightBg}) no-repeat center;
        }
        `,
        },
       ];


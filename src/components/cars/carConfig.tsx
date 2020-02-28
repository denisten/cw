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
            left: 36.1%;
            top: 38%;
             background: url(${bottomLeftBg}) no-repeat center;
          }
         `,
         animationEndParams: `
         0% {
            left: 36.1%;
            top: 38%;
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
            left: 35.4%;
            top: 39.2%;
             background: url(${bottomRightBg}) no-repeat center;
          }
          99% {
          background: url(${bottomRightBg}) no-repeat center;
          }
          100% {
            left: 42.4%;
            top: 44.3%;
             background: url(${topLeftBg}) no-repeat center;
          }
        `,
        animationEndParams: `
        0% {
            left: 42.4%;
            top: 44.3%;
            background: url(${topLeftBg}) no-repeat center;
        }
        99% {
        background: url(${topLeftBg}) no-repeat center;
        }
        100% {
          left: 35.4%;
          top: 39.2%;
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
            left: 58.4%;
            top: 48.2%;
             background: url(${bottomRightBg}) no-repeat center;
          }
          99% {
          background: url(${bottomRightBg}) no-repeat center;
          }
          100% {
            left: 72.6%;
            top: 58.1%;
             background: url(${topLeftBg}) no-repeat center;
          }
        `,
        animationEndParams: `
        0% {
          left: 72.6%;
          top: 58.3%;
            background: url(${topLeftBg}) no-repeat center;
        }
        99% {
        background: url(${topLeftBg}) no-repeat center;
        }
        100% {
          left: 58.1%;
          top: 48.2%;
          background: url(${bottomRightBg}) no-repeat center;
        }
        `,
        },
       ];


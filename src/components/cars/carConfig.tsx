import toLeftBg from './toRight.png';
import toRightBg from './toLeft.png';
export const carConfig = [
         {
           id: 1,
           carStyle: {
             animDuration: '14s',
             animationTimingFunction: 'ease-in-out',
             animationDirection: 'normal',
             animationIterationCount: 1,
           },
           animationStartParams: `
           0% {
            left: 25.3%;
            top: 45.6%;
             background: url(${toRightBg}) no-repeat center;
          }
          99% {
          background: url(${toRightBg}) no-repeat center;
          }
          100% {
            left: 35.8%;
            top: 38.1%;
             background: url(${toLeftBg}) no-repeat center;
          }
         `,
         animationEndParams: `
         0% {
            left: 35.8%;
            top: 38.1%;
             background: url(${toLeftBg}) no-repeat center;
          }
          99% {
          background: url(${toLeftBg}) no-repeat center;
          }
          100% {
            left: 25.3%;
            top: 45.6%;
             background: url(${toRightBg}) no-repeat center;
          }
         `,
         },

         {
          id: 2,
          carStyle: {
            animDuration: '6s',
            animationTimingFunction: 'ease-in-out',
            animationDirection: 'normal',
            animationIterationCount: 1,
          },
          animationStartParams: `
          0% {
           left: 25.3%;
           top: 45.6%;
            background: url(${toRightBg}) no-repeat center;
         }
         99% {
         background: url(${toRightBg}) no-repeat center;
         }
         100% {
           left: 35.8%;
           top: 38.1%;
            background: url(${toLeftBg}) no-repeat center;
         }
        `,
        animationEndParams: `
        0% {
           left: 35.8%;
           top: 38.1%;
            background: url(${toLeftBg}) no-repeat center;
         }
         99% {
         background: url(${toLeftBg}) no-repeat center;
         }
         100% {
           left: 25.3%;
           top: 45.6%;
            background: url(${toRightBg}) no-repeat center;
         }
        `,
        },
       ];


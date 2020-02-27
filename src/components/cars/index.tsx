import React from 'react';
import styled, {keyframes} from 'styled-components';
import toLeftBg from './toLeft.png';
import toRightBg from './toRight.png';


const animation = keyframes`
0% {
  left: 25.69%;
  top: 45.6%;
}


100% {
  /* transform: translate( 36.1%, 38.1%); */
  left: 36.1%;
  top: 38.1%;
  background: url(${toLeftBg}) no-repeat center;
      background-size: 100% 100%;
}
`

const animationBg = keyframes`
    0% {
      background: url(${toRightBg}) no-repeat center;
      background-size: 100% 100%;
    }
    50% {
      background: url(${toRightBg}) no-repeat center;
      background-size: 100% 100%;
    }
    90% {
      background: url(${toRightBg}) no-repeat center;
      background-size: 100% 100%;
    }

    100% {
      background: url(${toLeftBg}) no-repeat center;
      background-size: 100% 100%;
    }
`

const CarBlock = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  left: 25.69%;
  top: 45.6%;
  background: url(${toRightBg}) no-repeat center;
  background-size: 100% 100%;
  animation-name: ${animation};
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  /* animation:  4s linear 3s infinite alternate ${animation}; */
`;

export const Car = () => {
  return (
    <CarBlock></CarBlock>
  );
};

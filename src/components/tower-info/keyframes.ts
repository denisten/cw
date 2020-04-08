import { keyframes } from 'styled-components';

export const hideBlock = keyframes`
0% {
  height: 55px;
  margin-top: 32px;
}
100% {
  height: 0px;
  margin-top: 20px;
  overflow: hidden;
}
`;
export const showBlock = keyframes`
0% {
  height: 0px;
  margin-top: 20px;
}
100% {
  height: 55px;
  margin-top: 32px;
}
`;

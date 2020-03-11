import { createGlobalStyle } from 'styled-components';
import openSans from './fonts/OpenSans-Bold.ttf';

export const GlobalStyle = createGlobalStyle`
    //@font-face {
    // font-family: "OpenSans";
    // src: url("${openSans}") format("truetype");
    // }
    body {
      margin: 0;
      padding: 0;
      font-family: "OpenSans";
    }
`;

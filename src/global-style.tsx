import { createGlobalStyle } from 'styled-components';
import MTSSansRegular from './fonts/MTSSans-Regular.ttf';
import MTSSansBold from './fonts/MTSSans-Bold.ttf';
import MTSSansBlack from './fonts/MTSSans-Black.ttf';
import MTSSansMedium from './fonts/MTSSans-Medium.ttf';
import MTSSansUltraWide from './fonts/MTSSans-UltraWide.ttf';

export const GlobalStyle = createGlobalStyle`
    @font-face {
    src: url("${MTSSansRegular}") format("truetype");
    src: url("${MTSSansBold}") format("truetype");
    src: url("${MTSSansBlack}") format("truetype");
    src: url("${MTSSansMedium}") format("truetype");
    src: url("${MTSSansUltraWide}") format("truetype");
    }
    body {
      margin: 0;
      padding: 0;
      font-family: "MTSSansBlack",sans-serif;
    }
`;

import { createGlobalStyle } from 'styled-components';
import MTSSansRegular from './fonts/MTSSans-Regular.ttf';
import MTSSansBold from './fonts/MTSSans-Bold.ttf';
import MTSSansBlack from './fonts/MTSSans-Black.ttf';
import MTSSansMedium from './fonts/MTSSans-Medium.ttf';
import MTSSansUltraWide from './fonts/MTSSans-UltraWide.ttf';
import { MTSSans } from './fonts';
import { fixSizeClassName, mutedClassName } from './UI/tower-component-wrapper';

export const GlobalStyle = createGlobalStyle`
    @font-face {
    font-family: "MTSSansRegular";
    src: url("${MTSSansRegular}") format("truetype");
    }
    @font-face {
      font-family: "MTSSansBold";
      src: url("${MTSSansBold}") format("truetype");
    }
    @font-face {
      font-family: "MTSSansBlack";
     src: url("${MTSSansBlack}") format("truetype");
    }
    @font-face {
      font-family: "MTSSansMedium";
     src: url("${MTSSansMedium}") format("truetype");
    }
    @font-face {
      font-family: "MTSSansUltraWide";
     src: url("${MTSSansUltraWide}") format("truetype");
    }
    body {
      margin: 0;
      padding: 0;
      font-family: ${MTSSans.REGULAR};
    }


    ::-webkit-scrollbar {
  background-color: none; /* or add it to the track */
  width: 6px;
}

  ::-webkit-scrollbar-thumb {
      background: #bbc1c7;
      border-radius: 4px;
      &:hover {
        background: black;
      }
  }


     .${fixSizeClassName} .${mutedClassName}::before {
        transform: scale(3);
        top: 100%;
        left: 40%;
      }
  

`;

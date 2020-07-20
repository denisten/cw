import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import city01 from './city_01.png';
import city02 from './city_02.png';
const Wrapper = styled.div`
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  z-index: 8;
  width: 440px;
  height: 403px;
  position: relative;
`;

const growAnim = keyframes`
        0%   { transform: scaleY(0)    translateY(0);} }
        100% { transform: scaleY(1)    translateY(0);}
`;

enum animationStates {
  ACTIVE = 'active',
  DISABLE = 'disable',
}

const LogoLayer = styled.img<ILogoLayer>`
  width: ${props => props.width};
  height: ${props => props.height};
  position: absolute;
  bottom: 0;
  left: 0;
  transform-origin: bottom;
  z-index: ${props => props.zIndex};

  &.${animationStates.ACTIVE} {
    animation: ${growAnim} 1s both;
  }
`;

const styledConfig = {
  logoLayerOne: {
    width: '440px',
    height: '403px',
    zIndex: 1,
  },
  logoLayerTwo: {
    width: '536px',
    height: '307px',
    zIndex: 2,
  },
};

export const Logo = () => {
  const layerOne = useRef(null);
  const layerTwo = useRef(null);
  return (
    <Wrapper>
      <LogoLayer
        {...styledConfig.logoLayerOne}
        src={city01}
        alt="logolayer"
        ref={layerOne}
      />
      <LogoLayer
        {...styledConfig.logoLayerTwo}
        src={city02}
        alt="logolayer"
        ref={layerTwo}
      />
    </Wrapper>
  );
};

interface ILogoLayer {
  width: string;
  height: string;
  zIndex: number;
}

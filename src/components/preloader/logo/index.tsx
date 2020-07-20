import React, { useRef, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import city01 from './city_01.png';
import city02 from './city_02.png';
import city03 from './city_03.png';
import world from './mir.png';
import client from './klient.png';
const Wrapper = styled.div`
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  z-index: 8;
  width: 637px;
  height: 403px;
  position: relative;
`;

const growAnim = keyframes`
        0%   { transform: scaleY(0)    translateY(0);}
        80% {transform: scaleY(1.3)    translateY(0);}
        100% { transform: scaleY(1)    translateY(0);}
`;

const fadeAnim = keyframes`
        0%   { transform: scaleY(1)    translateY(0);}
        100% { transform: scaleY(0)    translateY(0);}
`;

enum animationStates {
  NORMAL = 'normal',
  FADE = 'fade',
}
const basicAnimationDelay = 350;
const LogoLayer = styled.img<ILogoLayer>`
  width: ${props => props.width};
  height: ${props => props.height};
  position: absolute;
  bottom: ${props => props.bottom || '0px'};
  left: ${props => props.left || '0px'};
  transform-origin: bottom;
  z-index: ${props => props.zIndex};
  animation: ${growAnim} ${basicAnimationDelay}ms linear both;
  animation-delay: ${props => props.animationDelay};

  &.${animationStates.FADE} {
    animation: ${fadeAnim} ${basicAnimationDelay}ms linear both;
    animation-delay: ${props => props.reverseAnimationDelay} !important;
  }
`;

enum animatedItemsOrder {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

const styledConfig = {
  world: {
    width: '350px',
    height: '124px',
    zIndex: 5,
    left: '132px',
    bottom: '138px',
    animationDelay: `${basicAnimationDelay * animatedItemsOrder.ONE}ms`,
    reverseAnimationDelay: `${basicAnimationDelay * animatedItemsOrder.FIVE}ms`,
  },
  client: {
    width: '637pxpx',
    height: '147pxpx',
    zIndex: 5,
    animationDelay: `${basicAnimationDelay * animatedItemsOrder.TWO}ms`,
    reverseAnimationDelay: `${basicAnimationDelay * animatedItemsOrder.FOUR}ms`,
  },
  cityLayerOne: {
    width: '440px',
    height: '403px',
    zIndex: 3,
    bottom: '114px',
    left: '100px',
    animationDelay: `${basicAnimationDelay * animatedItemsOrder.THREE}ms`,
    reverseAnimationDelay: `${basicAnimationDelay *
      animatedItemsOrder.THREE}ms`,
  },
  cityLayerTwo: {
    width: '536px',
    height: '307px',
    zIndex: 2,
    bottom: '106px',
    left: '40px',
    animationDelay: `${basicAnimationDelay * animatedItemsOrder.FOUR}ms`,
    reverseAnimationDelay: `${basicAnimationDelay * animatedItemsOrder.TWO}ms`,
  },
  cityLayerThree: {
    width: '498px',
    height: '327px',
    zIndex: 1,
    bottom: '124px',
    left: '88px',
    animationDelay: `${basicAnimationDelay * animatedItemsOrder.FIVE}ms`,
    reverseAnimationDelay: `${basicAnimationDelay * animatedItemsOrder.ONE}ms`,
  },
};

export const Logo: React.FC<ILogo> = ({ onAnimationEnd }) => {
  const [animationFade, setAnimationFade] = useState(false);

  return (
    <Wrapper>
      <LogoLayer
        {...styledConfig.world}
        src={world}
        alt="logolayer"
        className={animationFade ? animationStates.FADE : ''}
        onAnimationEnd={() => {
          animationFade && onAnimationEnd();
        }}
      />
      <LogoLayer
        {...styledConfig.client}
        src={client}
        alt="logolayer"
        className={animationFade ? animationStates.FADE : ''}
      />
      <LogoLayer
        {...styledConfig.cityLayerOne}
        src={city01}
        alt="logolayer"
        className={animationFade ? animationStates.FADE : ''}
      />
      <LogoLayer
        {...styledConfig.cityLayerTwo}
        src={city02}
        alt="logolayer"
        className={animationFade ? animationStates.FADE : ''}
      />
      <LogoLayer
        {...styledConfig.cityLayerThree}
        src={city03}
        alt="logolayer"
        className={animationFade ? animationStates.FADE : ''}
        onAnimationEnd={() => setAnimationFade(true)}
      />
    </Wrapper>
  );
};

interface ILogoLayer {
  width: string;
  height: string;
  zIndex: number;
  bottom?: string;
  left?: string;
  transition?: string;
  animationDelay?: string;
  animationFade?: boolean;
  reverseAnimationDelay?: string;
}

interface ILogo {
  onAnimationEnd: () => void;
}

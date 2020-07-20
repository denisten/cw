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

enum animationStates {
  ACTIVE = 'active',
  DISABLE = 'disable',
}

enum animationSteps {
  ZERO = 'zero',
  CLIENT_ANIM = 'clientAnim',
  CITY_LAYER_ONE = 'cityLayerOne',
  CITY_LAYER_TWO = 'cityLayerTwo',
  CITY_LAYER_THREE = 'cityLayerThree',
  ONE = 'one',
  TWO = 'two',
  THREE = 'three',
}

const LogoLayer = styled.img<ILogoLayer>`
  width: ${props => props.width};
  height: ${props => props.height};
  position: absolute;
  bottom: ${props => props.bottom || '0px'};
  left: ${props => props.left || '0px'};
  transform-origin: bottom;
  z-index: ${props => props.zIndex};
  transform: scaleY(0) translateY(0);

  &.${animationStates.ACTIVE} {
    animation: ${growAnim} 0.5s both linear;
  }
`;

const styledConfig = {
  world: {
    width: '350px',
    height: '124px',
    zIndex: 5,
    left: '132px',
    bottom: '138px',
  },
  client: {
    width: '637pxpx',
    height: '147pxpx',
    zIndex: 5,
  },
  cityLayerOne: {
    width: '440px',
    height: '403px',
    zIndex: 3,
    bottom: '114px',
    left: '100px',
  },
  cityLayerTwo: {
    width: '536px',
    height: '307px',
    zIndex: 2,
    bottom: '106px',
    left: '40px',
  },
  cityLayerThree: {
    width: '498px',
    height: '327px',
    zIndex: 1,
    bottom: '124px',
    left: '88px',
  },
};

export const Logo = () => {
  const layerWorld = useRef<HTMLImageElement>(null);
  const layerClient = useRef<HTMLImageElement>(null);
  const cityLayerOne = useRef<HTMLImageElement>(null);
  const cityLayerTwo = useRef<HTMLImageElement>(null);
  const cityLayerThree = useRef<HTMLImageElement>(null);
  const [animationStep, setAnimationStep] = useState(animationSteps.ZERO);
  const animationStart = () => {
    if (layerWorld.current) {
      layerWorld.current.classList.add(animationStates.ACTIVE);
    }
  };
  useEffect(() => {
    animationStart();
  }, [layerWorld]);

  useEffect(() => {
    const request = requestAnimationFrame(() => {
      if (animationStep === animationSteps.CLIENT_ANIM) {
        layerClient?.current?.classList.add(animationStates.ACTIVE);
      } else if (animationStep === animationSteps.CITY_LAYER_ONE) {
        cityLayerOne?.current?.classList.add(animationStates.ACTIVE);
      } else if (animationStep === animationSteps.CITY_LAYER_TWO) {
        cityLayerTwo?.current?.classList.add(animationStates.ACTIVE);
      } else if (animationStep === animationSteps.CITY_LAYER_THREE) {
        cityLayerThree?.current?.classList.add(animationStates.ACTIVE);
      }
    });
    return () => cancelAnimationFrame(request);
  }, [animationStep]);

  return (
    <Wrapper>
      <LogoLayer
        {...styledConfig.world}
        src={world}
        alt="logolayer"
        ref={layerWorld}
        onAnimationEnd={() => setAnimationStep(animationSteps.CLIENT_ANIM)}
      />
      <LogoLayer
        {...styledConfig.client}
        src={client}
        alt="logolayer"
        ref={layerClient}
        onAnimationEnd={() => setAnimationStep(animationSteps.CITY_LAYER_ONE)}
      />
      <LogoLayer
        {...styledConfig.cityLayerOne}
        src={city01}
        alt="logolayer"
        ref={cityLayerOne}
        onAnimationEnd={() => setAnimationStep(animationSteps.CITY_LAYER_TWO)}
      />
      <LogoLayer
        {...styledConfig.cityLayerTwo}
        src={city02}
        alt="logolayer"
        ref={cityLayerTwo}
        onAnimationEnd={() => setAnimationStep(animationSteps.CITY_LAYER_THREE)}
      />
      <LogoLayer
        {...styledConfig.cityLayerThree}
        src={city03}
        alt="logolayer"
        ref={cityLayerThree}
        onTransitionEnd={() => setAnimationStep(animationSteps.THREE)}
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
}

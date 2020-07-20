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

enum animationGrowSteps {
  GROW_CLIENT_ANIM = 'growClientAnim',
  GROW_CITY_LAYER_ONE = 'growCityLayerOne',
  GROW_CITY_LAYER_TWO = 'growCityLayerTwo',
  GROW_CITY_LAYER_THREE = 'growCityLayerThree',
}

enum animationFadeSteps {
  FADE_CLIENT_ANIM = 'fadeClientAnim',
  FADE_CITY_LAYER_ONE = 'fadeCityLayerOne',
  FADE_CITY_LAYER_TWO = 'fadeCityLayerTwo',
  FADE_CITY_LAYER_THREE = 'fadeCityLayerThree',
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
    /* animation: ${growAnim} 0.5s both linear; */
    transform: scaleY(1) translateY(0);
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
  const [animationStep, setAnimationStep] = useState<
    animationGrowSteps | animationFadeSteps | null
  >(null);
  const [activeAnimationState, setActiveAnimationState] = useState(
    animationStates.ACTIVE
  );
  const animationStart = () => {
    if (layerWorld.current) {
      layerWorld.current.classList.add(animationStates.ACTIVE);
    }
  };
  useEffect(() => {
    animationStart();
  }, [layerWorld]);

  const growAnimationHandler = () => {
    if (animationStep === animationGrowSteps.GROW_CLIENT_ANIM) {
      layerClient?.current?.classList.add(animationStates.ACTIVE);
    } else if (animationStep === animationGrowSteps.GROW_CITY_LAYER_ONE) {
      cityLayerOne?.current?.classList.add(animationStates.ACTIVE);
    } else if (animationStep === animationGrowSteps.GROW_CITY_LAYER_TWO) {
      cityLayerTwo?.current?.classList.add(animationStates.ACTIVE);
    } else if (animationStep === animationGrowSteps.GROW_CITY_LAYER_THREE) {
      cityLayerThree?.current?.classList.add(animationStates.ACTIVE);
    }
  };

  const fadeAnimationHandler = () => {
    if (animationStep === animationGrowSteps.GROW_CITY_LAYER_THREE) {
      cityLayerThree?.current?.classList.remove(animationStates.ACTIVE);
    } else if (animationStep === animationFadeSteps.FADE_CITY_LAYER_THREE) {
      cityLayerTwo?.current?.classList.remove(animationStates.ACTIVE);
    } else if (animationStep === animationFadeSteps.FADE_CITY_LAYER_TWO) {
      cityLayerOne?.current?.classList.remove(animationStates.ACTIVE);
    } else if (animationStep === animationFadeSteps.FADE_CITY_LAYER_ONE) {
      layerClient?.current?.classList.remove(animationStates.ACTIVE);
    } else if (animationStep === animationFadeSteps.FADE_CLIENT_ANIM) {
      layerWorld?.current?.classList.remove(animationStates.ACTIVE);
    }
  };

  useEffect(() => {
    const request = requestAnimationFrame(() => {
      if (activeAnimationState === animationStates.ACTIVE) {
        growAnimationHandler();
      } else {
        fadeAnimationHandler();
      }
    });
    return () => cancelAnimationFrame(request);
  }, [animationStep, activeAnimationState]);

  return (
    <Wrapper>
      <LogoLayer
        {...styledConfig.world}
        src={world}
        alt="logolayer"
        ref={layerWorld}
        onTransitionEnd={() => {
          if (activeAnimationState === animationStates.ACTIVE) {
            setAnimationStep(animationGrowSteps.GROW_CLIENT_ANIM);
          } else {
            //   setAnimationStep(animationFadeSteps.FADE_CLIENT_ANIM);
          }
        }}
      />
      <LogoLayer
        {...styledConfig.client}
        src={client}
        alt="logolayer"
        ref={layerClient}
        onTransitionEnd={() => {
          if (activeAnimationState === animationStates.ACTIVE) {
            setAnimationStep(animationGrowSteps.GROW_CITY_LAYER_ONE);
          } else {
            setAnimationStep(animationFadeSteps.FADE_CLIENT_ANIM);
          }
        }}
      />
      <LogoLayer
        {...styledConfig.cityLayerOne}
        src={city01}
        alt="logolayer"
        ref={cityLayerOne}
        onTransitionEnd={() => {
          if (activeAnimationState === animationStates.ACTIVE) {
            setAnimationStep(animationGrowSteps.GROW_CITY_LAYER_TWO);
          } else {
            setAnimationStep(animationFadeSteps.FADE_CITY_LAYER_ONE);
          }
        }}
      />
      <LogoLayer
        {...styledConfig.cityLayerTwo}
        src={city02}
        alt="logolayer"
        ref={cityLayerTwo}
        onTransitionEnd={() => {
          if (activeAnimationState === animationStates.ACTIVE) {
            setAnimationStep(animationGrowSteps.GROW_CITY_LAYER_THREE);
          } else {
            setAnimationStep(animationFadeSteps.FADE_CITY_LAYER_TWO);
          }
        }}
      />
      <LogoLayer
        {...styledConfig.cityLayerThree}
        src={city03}
        alt="logolayer"
        ref={cityLayerThree}
        onTransitionEnd={() => {
          if (activeAnimationState === animationStates.ACTIVE) {
            setActiveAnimationState(animationStates.DISABLE);
          } else {
            setAnimationStep(animationFadeSteps.FADE_CITY_LAYER_THREE);
          }
        }}
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
}

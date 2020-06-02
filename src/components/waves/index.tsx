import React from 'react';
import styled, { Keyframes } from 'styled-components';
import { waveConfig } from './wave-animation-config';
import animRiverSprite from './anim_river.png';
import { Sprite } from '../sprite';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { spriteWrapperConfig, mainSpriteSettings } from './sprites-config';

const WaveImg = styled.div<IWaveImg>`
  width: ${props => props.width};
  height: ${props => props.height};
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  z-index: 333;
  background: url(${props => props.background});
  background-size: ${props => props.backgroundSize || '100% 100%'};
  filter: url('#turbulence');
  transform: ${props => props.transform};
  background-repeat: ${props => props.backgroundRepeat || 'no-repeat'};
  border-radius: ${props => props.borderRadius || '0px'};
`;

const SpriteWrapper = styled.div<{ animation: Keyframes }>`
  animation: ${props => props.animation} 3s infinite linear;
  position: absolute;
  z-index: ${ZIndexes.DECORATION};
`;

export const Waves: React.FC = React.memo(() => {
  return (
    <>
      {spriteWrapperConfig.map((flareConfig, ind) => {
        return (
          <SpriteWrapper key={ind} {...flareConfig}>
            <Sprite key={ind} {...mainSpriteSettings} img={animRiverSprite} />
          </SpriteWrapper>
        );
      })}
      {waveConfig.map((waveParams, ind) => (
        <WaveImg key={ind} {...waveParams} />
      ))}
      <svg>
        <filter id="turbulence" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            id="sea-filter"
            numOctaves="3"
            seed="2"
            baseFrequency="0.02 0.05"
          ></feTurbulence>
          <feDisplacementMap scale="20" in="SourceGraphic"></feDisplacementMap>
          <animate
            xlinkHref="#sea-filter"
            attributeName="baseFrequency"
            dur="6s"
            keyTimes="0;0.5;1"
            // values="0.02 0.06;0.03 0.07;0.04 0.08"
            from="0.02"
            by="0.05"
            repeatCount="indefinite"
          />
        </filter>
      </svg>
    </>
  );
});

export interface IWaveImg {
  width: string;
  height: string;
  top: string;
  left: string;
  transform?: string;
  background?: string;
  backgroundRepeat?: string;
  borderRadius?: string;
  backgroundSize?: string;
}

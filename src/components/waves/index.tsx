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
  z-index: ${ZIndexes.DECORATION};
  transform: ${props => props.transform};
  animation: ${props => props.animation} infinite linear;
  animation-duration: ${props => props.animationDuration || '4s'};
  animation-delay: ${props => props.animationDelay};
  animation-direction: ${props => props.animationDirection};
  background: url(${props => props.background});
  background-size: ${props => props.backgroundSize || '100% 100%'};
  background-repeat: ${props => props.backgroundRepeat || 'no-repeat'};
  border-radius: ${props => props.borderRadius || '0px'};
`;

const SpriteWrapper = styled.div<{ animation: Keyframes }>`
  animation: ${props => props.animation} 3s infinite linear alternate;
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
    </>
  );
});

export interface IWaveImg {
  width: string;
  height: string;
  top: string;
  left: string;
  transform?: string;
  animation?: Keyframes;
  animationDelay?: string;
  animationDuration?: string;
  animationDirection?: string;
  background?: string;
  backgroundRepeat?: string;
  borderRadius?: string;
  backgroundSize?: string;
}

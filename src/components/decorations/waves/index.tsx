import React from 'react';
import styled from 'styled-components';
import { waveConfig } from './wave-animation-config';
import { svgFilter } from './svg-filter';
import { spriteWrapperConfig, mainSpriteSettings } from './sprites-config';
import animRiverSprite from './anim_river.png';
import { ZIndexes } from '../../root-component/z-indexes-enum';
import { SpriteCollection } from '../../sprite-collection';

const WaveImg = styled.div<IWaveImg>`
  width: ${props => props.width};
  height: ${props => props.height};
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  z-index: ${props => props.zIndex || ZIndexes.CARS};
  background: url(${props => props.background});
  background-size: ${props => props.backgroundSize || '100% 100%'};
  filter: url('#turbulence');
  transform: ${props => props.transform};
  background-repeat: ${props => props.backgroundRepeat || 'no-repeat'};
  border-radius: ${props => props.borderRadius || '0px'};
`;

const Waves: React.FC = React.memo(() => {
  return (
    <>
      <SpriteCollection
        styleConfig={spriteWrapperConfig}
        spriteParams={mainSpriteSettings}
        img={animRiverSprite}
      />
      {waveConfig.map((waveParams, ind) => (
        <WaveImg key={ind} {...waveParams} />
      ))}
      {svgFilter}
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
  zIndex?: number;
}

export default Waves;

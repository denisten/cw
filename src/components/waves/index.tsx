import React from 'react';
import styled from 'styled-components';
import { waveConfig } from './wave-animation-config';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { svgFilter } from './svg-filter';

const WaveImg = styled.div<IWaveImg>`
  width: ${props => props.width};
  height: ${props => props.height};
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  z-index: 100;
  background: url(${props => props.background});
  background-size: ${props => props.backgroundSize || '100% 100%'};
  filter: url('#turbulence');
  transform: ${props => props.transform};
  background-repeat: ${props => props.backgroundRepeat || 'no-repeat'};
  border-radius: ${props => props.borderRadius || '0px'};
`;

export const Waves: React.FC = React.memo(() => {
  return (
    <>
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
}

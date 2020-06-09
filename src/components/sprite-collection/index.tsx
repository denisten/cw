import React from 'react';
import styled, { Keyframes } from 'styled-components';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { Sprite } from '../sprite';

const SpriteWrapper = styled.div<{ animation?: Keyframes; zIndex?: number }>`
  animation: ${props => props.animation} 4s infinite linear;
  position: absolute;
  z-index: ${props => props.zIndex || ZIndexes.CARS};
`;

export const SpriteCollection: React.FC<ISpritesConfig> = ({
  styleConfig,
  spriteParams,
  img,
  zIndex,
}) => {
  return (
    <>
      {styleConfig.map((style, ind) => {
        return (
          <SpriteWrapper key={ind} {...style} zIndex={zIndex}>
            <Sprite {...spriteParams} img={img} />
          </SpriteWrapper>
        );
      })}
    </>
  );
};

interface ISpritesConfig {
  styleConfig: ISpriteCollectionStyleConfig[];
  spriteParams: {
    canvasWidth: number;
    canvasHeight: number;
    numberOfFramesX: number;
    numberOfFramesY: number;
    ticksPerFrame: number;
    infinity: boolean;
    style: React.CSSProperties;
  };
  img: string;
  zIndex?: number;
}

export interface ISpriteCollectionStyleConfig {
  style: React.CSSProperties;
  animation?: Keyframes;
}

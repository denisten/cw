import { ISpriteCollectionStyleConfig } from '../sprite-collection';

export const decorationStyleConfig: ISpriteCollectionStyleConfig[] = [
  {
    style: {
      top: '40%',
      left: '47.7%',
    },
  },
];

export const decorationSpriteSettings = {
  canvasWidth: 99,
  canvasHeight: 147,
  numberOfFramesX: 6,
  numberOfFramesY: 5,
  ticksPerFrame: 2,
  infinity: true,

  style: {
    width: 'auto',
    height: 'auto',
  } as React.CSSProperties,
};

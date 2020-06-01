import { ZIndexes } from '../root-component/z-indexes-enum';

export const spritesConfig = [
  {
    style: {
      width: '66px',
      height: '104px',
      position: 'absolute',
      top: '37.6%',
      left: '56.4%',
      zIndex: ZIndexes.DECORATION,
    } as React.CSSProperties,
  },
  {
    style: {
      width: '66px',
      height: '104px',
      position: 'absolute',
      top: '40.6%',
      left: '56.4%',
      zIndex: ZIndexes.DECORATION,
    } as React.CSSProperties,
  },
];

export const mainSpriteSettings = {
  canvasWidth: 168,
  canvasHeight: 200,
  numberOfFramesX: 4,
  numberOfFramesY: 4,
  ticksPerFrame: 4,
  infinity: true,
};

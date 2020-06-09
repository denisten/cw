import React from 'react';
import { SpriteCollection } from '../sprite-collection';
import {
  decorationStyleConfig,
  decorationSpriteSettings,
} from './spriteConfig';
import sprite from './anim_fountain.png';
import { ZIndexes } from '../root-component/z-indexes-enum';

export const Decorations: React.FC = () => {
  return (
    <SpriteCollection
      styleConfig={decorationStyleConfig}
      spriteParams={decorationSpriteSettings}
      img={sprite}
      zIndex={ZIndexes.DECORATION}
    />
  );
};

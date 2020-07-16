import React from 'react';
import { SpriteCollection } from '../sprite-collection';
import { fountainConfig } from './sprite-config';
import sprite from './anim_fountain.png';
import { ZIndexes } from '../root-component/z-indexes-enum';

const Decorations: React.FC = React.memo(() => {
  return (
    <>
      {fountainConfig.map((fountain, ind) => (
        <SpriteCollection
          key={ind}
          styleConfig={fountain.style}
          spriteParams={fountain.setting}
          img={sprite}
          zIndex={ZIndexes.DECORATION}
        />
      ))}
    </>
  );
});

export default Decorations;

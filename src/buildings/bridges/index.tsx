import React, { Fragment } from 'react';
import bridge1 from './1.png';
import bridge2 from './2.png';
import bridge3 from './3.png';
import bridge4 from './4.png';
import bridge5 from './5.png';
import { LazyImage } from '@tsareff/lazy-image';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';
import * as R from 'ramda';

const StyledConfig = {
  bridge1: {
    style: {
      position: 'absolute',
      left: '28.2%',
      top: ' 66%',
      zIndex: ZIndexes.DECORATION,
    } as React.CSSProperties,
    img: bridge1,
  },
  bridge2: {
    style: {
      position: 'absolute',
      left: '46%',
      top: '30.6%',
      zIndex: ZIndexes.DECORATION,
    } as React.CSSProperties,
    img: bridge2,
  },
  bridge3: {
    style: {
      position: 'absolute',
      left: '44.8%',
      top: '50.8%',
      zIndex: ZIndexes.DECORATION,
    } as React.CSSProperties,
    img: bridge3,
  },
  bridge4: {
    style: {
      position: 'absolute',
      left: '63.1%',
      top: '10.6%',
      zIndex: ZIndexes.DECORATION,
    } as React.CSSProperties,
    img: bridge4,
  },
  bridge5: {
    style: {
      position: 'absolute',
      left: '12.1%',
      top: ' 86%',
      zIndex: ZIndexes.DECORATION,
    } as React.CSSProperties,
    img: bridge5,
  },
};

const BridgesImg = () => (
  <Fragment>
    {Object.values(StyledConfig).map(({ img, style }) => (
      <LazyImage src={img} style={style} key={img} />
    ))}
  </Fragment>
);

export const Bridges: React.FC<IBridges> = R.ifElse(
  R.has('showBridges'),
  () => <BridgesImg />,
  () => null
);

interface IBridges {
  showBridges: boolean;
}

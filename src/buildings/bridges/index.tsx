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
    position: 'absolute',
    left: '34%',
    top: ' 66%',
    zIndex: ZIndexes.DECORATION,
  } as React.CSSProperties,
  bridge2: {
    position: 'absolute',
    left: '55.5%',
    top: '30.6%',
    zIndex: ZIndexes.DECORATION,
  } as React.CSSProperties,
  bridge3: {
    position: 'absolute',
    left: '54%',
    top: '50.8%',
    zIndex: ZIndexes.DECORATION,
  } as React.CSSProperties,
  bridge4: {
    position: 'absolute',
    left: '66.6%',
    top: '10.6%',
    zIndex: ZIndexes.DECORATION,
  } as React.CSSProperties,
  bridge5: {
    position: 'absolute',
    left: '14.5%',
    top: ' 86%',
    zIndex: ZIndexes.DECORATION,
  } as React.CSSProperties,
};

const BridgesImg = () => (
  <Fragment>
    <LazyImage src={bridge1} style={{ ...StyledConfig.bridge1 }} />
    <LazyImage src={bridge2} style={{ ...StyledConfig.bridge2 }} />
    <LazyImage src={bridge3} style={{ ...StyledConfig.bridge3 }} />
    <LazyImage src={bridge4} style={{ ...StyledConfig.bridge4 }} />
    <LazyImage src={bridge5} style={{ ...StyledConfig.bridge5 }} />
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

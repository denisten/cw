import React, { Fragment } from 'react';
import bridge1 from './1.png';
import bridge2 from './2.png';
import bridge3 from './3.png';
import { LazyImage } from '@tsareff/lazy-image';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';

const StyledConfig = {
  firstBridge: {
    position: 'absolute',
    left: '34%',
    top: ' 66%',
    zIndex: ZIndexes.DECORATION,
  } as React.CSSProperties,
  secondBridge: {
    position: 'absolute',
    left: '55.5%',
    top: '30.6%',
    zIndex: ZIndexes.DECORATION,
  } as React.CSSProperties,
  thirdBridge: {
    position: 'absolute',
    left: '54%',
    top: '50.8%',
    zIndex: ZIndexes.DECORATION,
  } as React.CSSProperties,
};

type BridgesProps = {
  showBridges: boolean;
};

const BridgesImg: React.FC = () => {
  return (
    <Fragment>
      <LazyImage src={bridge1} style={{ ...StyledConfig.firstBridge }} />
      <LazyImage src={bridge2} style={{ ...StyledConfig.secondBridge }} />
      <LazyImage src={bridge3} style={{ ...StyledConfig.thirdBridge }} />
    </Fragment>
  );
};

export const Bridges: React.FC<BridgesProps> = ({ showBridges }) => {
  if (showBridges) {
    return <BridgesImg />;
  } else return null;
};

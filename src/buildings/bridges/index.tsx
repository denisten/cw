import React, { Fragment } from 'react';
import bridge1 from './1.png';
import bridge2 from './2.png';
import bridge3 from './3.png';
import { LazyImage } from '@tsareff/lazy-image';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';

const StyledConfig = {
  firstBridge: {
    position: 'absolute',
    left: '56%',
    top: '33.5%',
  } as React.CSSProperties,
  secondBridge: {
    position: 'absolute',
    left: '56.7%',
    top: '29.2%',
  } as React.CSSProperties,
  thirdBridge: {
    position: 'absolute',
    left: '54.82%',
    top: '41.5%',
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
  return <Fragment>{showBridges ? <BridgesImg /> : null}</Fragment>;
};

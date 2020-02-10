import React from 'react';
import bridge1 from './1.png';
import bridge2 from './2.png';
import { LazyImage } from '@tsareff/lazy-image';

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
};

type BridgesProps = {
  showBridges: boolean;
};

const BridgesImg: React.FC = () => {
  return (
    <React.Fragment>
      <LazyImage src={bridge1} style={{ ...StyledConfig.firstBridge }} />
      <LazyImage src={bridge2} style={{ ...StyledConfig.secondBridge }} />
    </React.Fragment>
  );
};

export const Bridges: React.FC<BridgesProps> = ({ showBridges }) => {
  return <React.Fragment>{showBridges ? <BridgesImg /> : ''}</React.Fragment>;
};

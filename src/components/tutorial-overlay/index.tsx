import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div<ITutorialOverlay>`
  display: ${props => (props.displayFlag ? 'block' : 'none')};
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: ${props => props.zIndex || 1};
`;

const OverlayTopLevel = styled.div<{ zIndex?: number }>`
  z-index: ${props => props.zIndex || 0};
`;

export const TutorialOverlayTopLayer: React.FC<ITutorialOverlay> = ({
  zIndex,
  children,
}) => {
  return <OverlayTopLevel zIndex={zIndex}>{children}</OverlayTopLevel>;
};

export const TutorialOverlay: React.FC<ITutorialOverlay> = props => {
  return <Overlay {...props}></Overlay>;
};

interface ITutorialOverlay {
  zIndex?: number;
  displayFlag?: boolean;
}

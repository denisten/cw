import React from 'react';
import styled from 'styled-components';

const OverlayWrapper = styled.div<IOverlay>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  display: ${props => (props.displayFlag ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: ${props => props.zIndex || 1};
`;

export const Overlay: React.FC<IOverlay> = ({ children, ...props }) => {
  return <OverlayWrapper {...props}>{children}</OverlayWrapper>;
};

interface IOverlay {
  zIndex?: number;
  displayFlag?: boolean;
}

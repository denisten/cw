import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div<ITutorialOverlay>`
  display: ${props => (props.displayFlag ? 'block' : 'none')};
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: ${props => props.zIndex || 1};
`;

export const TutorialOverlay: React.FC<ITutorialOverlay> = props => {
  return <Overlay {...props}></Overlay>;
};

interface ITutorialOverlay {
  zIndex?: number;
  displayFlag?: boolean;
}

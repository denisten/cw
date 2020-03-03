import React from 'react';
import styled from 'styled-components';

const ParentDivWrapper = styled.div<ParentDivWrapperProps>`
  height: ${props => props.height};
  position: ${props => props.position || 'absolute'};
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  bottom: ${props => props.bottom}%;
  right: ${props => props.right}%;
  display: ${props => (props.displayFlag ? 'flex' : 'none')};
  flex-direction: column;
  z-index: ${props => props.zIndex};
  transform: translate(${props => props.transformTranslate});
  width: ${props => props.width};
`;

interface ParentDivWrapperProps {
  position?: string;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  zIndex?: number;
  transformTranslate?: string;
  height?: string;
  width?: string;
  displayFlag?: boolean;
}

export const ColumnWrapper: React.FC<ParentDivWrapperProps> = ({
  position,
  top,
  left,
  bottom,
  right,
  zIndex,
  transformTranslate,
  height,
  width,
  children,
  displayFlag,
}) => {
  return (
    <ParentDivWrapper
      position={position}
      zIndex={zIndex}
      top={top}
      left={left}
      bottom={bottom}
      right={right}
      height={height}
      width={width}
      transformTranslate={transformTranslate}
      displayFlag={displayFlag}
    >
      {children}
    </ParentDivWrapper>
  );
};

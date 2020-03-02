import React from 'react';
import styled from 'styled-components';

const ParentDivWrapper = styled.div<ParentDivWrapperProps>`
  height: ${props => props.height};
  position: ${props => props.position || 'absolute'};
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  bottom: ${props => props.bottom}%;
  right: ${props => props.right}%;
  display: flex;
  flex-direction: column;
  z-index: ${props => props.zIndex};
  transform: translate(${props => props.transformTranslate});
  background-color: 'red';
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
  ...props
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
      width = {width}
      transformTranslate={transformTranslate}
    >
      {children}
    </ParentDivWrapper>
  );
};

import React from 'react';
import styled from 'styled-components';

const ParentDivWrapper = styled.div<IColumnWrapper>`
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
  margin: ${props => props.margin};
  justify-content: ${props => props.justifyContent};
`;

export const ColumnWrapper: React.FC<IColumnWrapper> = ({
  children,
  style,
  ...props
}) => {
  return (
    <ParentDivWrapper {...props} style={style}>
      {children}
    </ParentDivWrapper>
  );
};

interface IColumnWrapper {
  style?: React.CSSProperties;
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
  margin?: string;
  justifyContent?: string;
}

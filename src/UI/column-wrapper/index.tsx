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
`;

export const ColumnWrapper: React.FC<IColumnWrapper> = ({
  children,
  ...props
}) => {
  return <ParentDivWrapper {...props}>{children}</ParentDivWrapper>;
};

interface IColumnWrapper {
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
}

import React from 'react';
import styled from 'styled-components';

const ParentDivWrapper = styled.div<IRowWrapper>`
  height: ${props => props.height};
  width: ${props => props.width};
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.justifyContent};
  position: relative;
  align-items: ${props => props.alignItems};
  padding: ${props => props.padding};
  left: ${props => props.left};
  right: ${props => props.right};
  margin: ${props => props.margin};
  background: ${props => props.background};
`;

export const RowWrapper: React.FC<IRowWrapper> = ({
  children,
  style = {},
  ...props
}) => {
  return (
    <ParentDivWrapper {...props} style={style}>
      {children}
    </ParentDivWrapper>
  );
};

interface IRowWrapper {
  width?: string;
  height?: string;
  justifyContent?: string;
  alignItems?: string;
  onMouseOut?: () => void;
  background?: string;
  padding?: string;
  right?: string;
  left?: string;
  margin?: string;
  style?: React.CSSProperties;
}

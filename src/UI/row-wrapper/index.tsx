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
`;

export const RowWrapper: React.FC<IRowWrapper> = ({ children, ...props }) => {
  return <ParentDivWrapper {...props}>{children}</ParentDivWrapper>;
};

interface IRowWrapper {
  width?: string;
  height?: string;
  justifyContent?: string;
  alignItems?: string;
  onMouseOut?: () => void;
  padding?: string;
  left?: string;
}

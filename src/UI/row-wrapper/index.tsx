import React from 'react';
import styled from 'styled-components';

const ParentDivWrapper = styled.div<RowWrapperProps>`
  height: ${props => props.height};
  width: ${props => props.width};
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.justifyContent};
  position: relative;
  align-items: ${props => props.alignItems};
`;

interface RowWrapperProps {
  width?: string;
  height?: string;
  justifyContent?: string;
  alignItems?: string;
  onMouseOut?: () => void;
}

export const RowWrapper: React.FC<RowWrapperProps> = ({
  children,
  ...props
}) => {
  return <ParentDivWrapper {...props}>{children}</ParentDivWrapper>;
};

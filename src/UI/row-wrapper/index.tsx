import React from 'react';
import styled from 'styled-components';

const ParentDivWrapper = styled.div<RowWrapperProps>`
  height: ${props => props.height};
  width: ${props => props.width};
  display: flex;
  flex-direction: row;
`;


interface RowWrapperProps {
  width?: string;
  height?: string;
}


export const RowWrapper: React.FC<RowWrapperProps> = ({
  width,
  height,
  ...props
}) => {
  return (
    <ParentDivWrapper
      width = {width}
      height = {height}
    >
    </ParentDivWrapper>
  );
};

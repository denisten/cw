import styled from 'styled-components';
import React from 'react';

const DividerWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 4px;
  background-color: #e2e5eb;
  position: absolute;
  bottom: 0;
`;

const Mover = styled.div<IMoveDivider>`
  position: absolute;
  top: 0;
  left: ${props => props.left + 'px'};
  height: 100%;
  width: ${props => props.width + 'px'};
  background-color: #08b0cc;
  transition: all 0.8s ease;
  transform: skew(-45deg);
`;

export const MoveDivider: React.FC<IMoveDivider> = ({ ...props }) => {
  return (
    <DividerWrapper>
      <Mover {...props} />
    </DividerWrapper>
  );
};

interface IMoveDivider {
  left?: number;
  width?: number;
}

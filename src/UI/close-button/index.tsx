import React from 'react';
import styled from 'styled-components';
import xMarkImg from './x-mark.png';

const ExitButtonWrapper = styled.div<ExitButtonWrapper>`
  position: absolute;
  width: ${props => props.width}%;
  height: ${props => props.height}%;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  bottom: ${props => props.bottom}%;
  right: ${props => props.right}%;
  background-image: url(${xMarkImg});
  background-repeat: no-repeat;
  background-size: contain;
  &:hover {
    cursor: pointer;
  }
`;

export const ExitButton: React.FC<ExitButton> = ({ callBack, ...props }) => {
  return <ExitButtonWrapper {...props} onClick={() => callBack()} />;
};

interface ExitButton extends ExitButtonWrapper {
  callBack: () => void;
}

interface ExitButtonWrapper {
  width: number;
  height: number;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

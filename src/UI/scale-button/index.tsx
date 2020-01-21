import React from 'react';
import styled from 'styled-components';

const ScaleButtonWrapper = styled.button<ScaleButtonWrapperProps>`
  position: fixed;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  bottom: ${props => props.bottom}%;
  right: ${props => props.right}%;
  width: ${props => props.width}%;
  height: ${props => props.height}%;
  z-index: 10;
`;

export const ScaleButton: React.FC<ScaleButtonProps> = ({
  scaleRefinements,
  callBack,
  ...props
}) => {
  return (
    <ScaleButtonWrapper {...props} onClick={callBack}>
      {scaleRefinements}
    </ScaleButtonWrapper>
  );
};

interface ScaleButtonWrapperProps {
  width: number;
  height: number;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

interface ScaleButtonProps extends ScaleButtonWrapperProps {
  scaleRefinements: string;
  callBack: () => void;
}

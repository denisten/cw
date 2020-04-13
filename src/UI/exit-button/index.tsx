import React, { useState } from 'react';
import styled from 'styled-components';
import background from './close-bcg.svg';
import hoverBackground from './close-hover.svg';

const CloseButton = styled.div<ICloseButton>`
  width: 28px;
  height: 28px;
  position: ${props => props.position || 'absolute'};
  top: ${props => props.top};
  left: ${props => props.left};
  bottom: ${props => props.bottom};
  right: ${props => props.right};
  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: scale(1.15);
    background-image: url(${hoverBackground});
  }

  &.pressed {
    transform: scale(0.8);
    background-image: url(${hoverBackground});
  }
`;

export const ExitButton: React.FC<ICloseButton> = ({ callBack, ...props }) => {
  const [pressed, setPressed] = useState(false);
  return (
    <CloseButton
      {...props}
      onClick={callBack}
      className={pressed ? 'pressed' : ''}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
    />
  );
};

interface ICloseButton {
  position?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  callBack?: () => void;
}

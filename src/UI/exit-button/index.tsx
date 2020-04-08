import React from 'react';
import styled from 'styled-components';
import background from './close-bcg.svg';
import hoverBackground from './close-hover.png';
import focusBackground from './close-focus.png';

const CloseButton = styled.button<ICloseButton>`
  width: 28px;
  height: 28px;
  position: ${props => props.position || 'absolute'};
  top: ${props => props.top};
  left: ${props => props.left};
  bottom: ${props => props.bottom};
  right: ${props => props.right};
  background-color: inherit;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  outline: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: scale(1.15);
    background-image: url(${hoverBackground});
  }

  &:focus {
    transform: scale(1.15);
    background-image: url(${focusBackground});
  }
  &:active {
    background-image: url(${focusBackground});
  }
`;

export const ExitButton: React.FC<ICloseButton> = ({ callBack, ...props }) => {
  return <CloseButton {...props} onClick={callBack} />;
};

interface ICloseButton {
  position?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  callBack?: () => void;
}

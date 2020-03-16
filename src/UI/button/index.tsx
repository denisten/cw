import React from 'react';
import styled from 'styled-components';
import { defaultScaleSize, scaleAnimation } from '../../hoc/scale-anim';

const CustomButtonWrapper = styled.div<ICustomButtonWrapper>`
  position: ${props => props.position};
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  right: ${props => props.right}%;
  bottom: ${props => props.bottom}%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};
  cursor: pointer;
  font-size: ${props => props.fontSize};
  margin: ${props => props.margin};
  animation-name: ${props =>
    props.animFlag
      ? scaleAnimation(props.scaleSize || defaultScaleSize)
      : 'none'};
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  border-radius: 2px;
  border: solid 2px #02adc9;
  white-space: nowrap;
  color: ${props => props.color || '#02adc9'};
  font-family: 'MTSSansBold';
  animation-duration: 1s;
`;

export const CustomButton: React.FC<CustomButtonProps> = ({
  content,
  callback,
  animFlag = false,
  scaleSize,
  ...props
}) => {
  return (
    <CustomButtonWrapper
      onClick={callback}
      animFlag={animFlag}
      scaleSize={scaleSize}
      {...props}
    >
      {content}
    </CustomButtonWrapper>
  );
};

interface ICustomButtonWrapper {
  position?: string;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  src?: number;
  width?: string;
  height?: string;
  fontSize?: string;
  margin?: string;
  animFlag?: boolean;
  scaleSize?: number;
}

interface CustomButtonProps extends ICustomButtonWrapper {
  content?: string;
  color?: string;
  callback?: () => void;
}

import React from 'react';
import styled from 'styled-components';
import { defaultScaleSize, scaleAnimation } from '../../hoc/scale-anim';

const CustomButtonWrapper = styled.div<ICustomButtonWrapper>`
  display: ${props => (props.displayFlag ? 'flex' : 'none')};
  position: ${props => props.position};
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  right: ${props => props.right}%;
  bottom: ${props => props.bottom}%;
  justify-content: center;
  align-items: center;
  width: ${props => props.width || '200px'};
  height: ${props => props.height || '44px'};
  cursor: pointer;
  font-size: ${props => props.fontSize || '16px'};
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
  .normal {
    width: 200px;
    height: 44px;
    border-radius: 2px;
    box-shadow: 1px 1px 4px 0 #bbc1c7,
      inset 0 1px 3px 0 rgba(255, 255, 255, 0.5);
    background-color: #02acc8;
  }

  .disabled {
    width: ${props => props.width || '200px'};
    height: ${props => props.height || '44px'};
    border-radius: 2px;
    background-color: #e2e5eb;
  }
`;

export const CustomButton: React.FC<CustomButtonProps> = ({
  content,
  callback,
  animFlag = false,
  scaleSize,
  displayFlag = true,
  ...props
}) => {
  return (
    <CustomButtonWrapper
      onClick={callback}
      animFlag={animFlag}
      scaleSize={scaleSize}
      displayFlag={displayFlag}
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
  displayFlag?: boolean;
}

interface CustomButtonProps extends ICustomButtonWrapper {
  content?: string;
  color?: string;
  callback?: () => void;
  className?: string;
}

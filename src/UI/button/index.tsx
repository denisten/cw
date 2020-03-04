import React from 'react';
import styled from 'styled-components';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';
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
  background-color: #01acc8;
  width: ${props => props.width};
  height: ${props => props.height};
  cursor: pointer;
  font-size: ${props => props.fontSize};
  margin: ${props => props.margin};
  box-shadow: 1.5px 1.3px 3.4px 0.6px rgba(72, 72, 72, 0.28);
  animation-name: ${props =>
    props.animFlag
      ? scaleAnimation(props.scaleSize || defaultScaleSize)
      : 'none'};
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 0.6s;
`;

const TitleWrapper = styled.span<{ color?: string }>`
  font-size: 100%;
  z-index: ${ZIndexes.UI_BUTTON};
  color: ${props => props.color || 'white'};
  position: absolute;
`;

export const CustomButton: React.FC<CustomButtonProps> = ({
  content,
  color,
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
      <TitleWrapper color={color}>{content}</TitleWrapper>
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

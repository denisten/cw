import React from 'react';
import styled, { keyframes } from 'styled-components';

export const myFunc = (bcg: string) => {
  return keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(${bcg}, 0.4);
  }
  70% {
      box-shadow: 0 0 0 20px rgba(${bcg}, 0);
  }
  100% {
      box-shadow: 0 0 0 0 rgba(${bcg}, 0);
  }
`;
};

const CustomButtonWrapper = styled.div<CustomButtonWrapperProps>`
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
    props.pulseAnim ? myFunc(props.pulseColor) : 'none'};
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 0.8s;
`;

const TitleWrapper = styled.span<{ color?: string }>`
  font-size: 100%;
  z-index: 1;
  color: ${props => props.color || 'white'};
  position: absolute;
`;

type CustomButtonWrapperProps = {
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
  pulseAnim: boolean;
  pulseColor: string;
};

// type CustomButtonWrapperPropsWithoutPulseProps = Exclude<
//   CustomButtonWrapperProps,
//   'pulseAnim' | 'pulseColor'
// >;

interface CustomButtonProps {
  content?: string;
  color?: string;
  callback?: () => void;
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
  pulseAnim?: boolean;
  pulseColor?: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  content,
  color,
  callback,
  pulseAnim = false,
  pulseColor = '1, 172, 200',
  ...props
}) => {
  return (
    <CustomButtonWrapper
      onClick={callback}
      pulseAnim={pulseAnim}
      pulseColor={pulseColor}
      {...props}
    >
      <TitleWrapper color={color}>{content}</TitleWrapper>
    </CustomButtonWrapper>
  );
};

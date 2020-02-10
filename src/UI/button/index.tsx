import React from 'react';
import styled from 'styled-components';

const CustomButtonWrapper = styled.div<CustomButtonWrapperProps>`
  position: ${props => props.position};
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  right: ${props => props.right}%;
  bottom: ${props => props.bottom}%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: 1.1px 1.7px 1.9px 0.1px rgba(26, 120, 169, 0.63);
  border: solid 1px #00f0ff;
  background-color: #1a78a9;
  width: ${props => props.width}%;
  height: ${props => props.height}%;
  cursor: pointer;
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
  width?: number;
  height?: number;
};

interface CustomButtonProps extends CustomButtonWrapperProps {
  content?: string;
  color?: string;
  callback?: () => void;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  content,
  color,
  callback,
  ...props
}) => {
  return (
    <CustomButtonWrapper onClick={callback} {...props}>
      <TitleWrapper color={color}>{content}</TitleWrapper>
    </CustomButtonWrapper>
  );
};

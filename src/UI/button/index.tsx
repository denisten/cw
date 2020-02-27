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
  box-shadow: 1.5px 1.3px 3.4px 0.6px rgba(72, 72, 72, 0.28);
  background-color: #01acc8;
  width: ${props => props.width};
  height: ${props => props.height};
  cursor: pointer;
  font-size: ${props => props.fontSize};
  margin: ${props => props.margin};
  box-shadow: 1.5px 1.3px 3.4px 0.6px rgba(72, 72, 72, 0.28);

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

import React from 'react';
import styled from 'styled-components';
import background from './background.png';

const Header = styled.div<HeaderProps>`
  width: 100%;
  height: ${props => props.height || '85px'};
  background: url(${background}) no-repeat center;
  background-size: cover;
  position: relative;
`;

interface HeaderProps {
  height?: string;
}

export const HeaderComponent: React.FC<HeaderProps> = ({
  height,
  children,
}) => {
  return <Header height={height}>{children}</Header>;
};
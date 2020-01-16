import styled from 'styled-components';

export const TowerImgWrapper = styled.img<TowerWrapperProps>`
  position: absolute;
  z-index: 100;
  width: ${props => props.width}%;
  height: ${props => props.height}%;
`;

type TowerWrapperProps = {
  width?: number;
  height?: number;
};

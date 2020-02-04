import React from 'react';
import substrateImg from './substrate.png';
import styled from 'styled-components';
const SubstrateWrapper = styled.div<SubstrateWrapper>`
  background-image: url(${substrateImg});
  background-size: cover;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  position: absolute;
  z-index: 10;
`;
export const Substrate: React.FC<SubstrateWrapper> = props => {
  return <SubstrateWrapper {...props} />;
};

type SubstrateWrapper = {
  width: number;
  height: number;
};

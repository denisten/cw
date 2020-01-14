import React from 'react';
import styled from 'styled-components';

const ModalWindowWrapper = styled.div`
  position: absolute;
  z-index: 1;
  right: 0;
  width: 35%;
  height: 100%;
  background-color: green;
`;

export const ModalWindow = (): React.ReactElement => {
  return <ModalWindowWrapper>hello</ModalWindowWrapper>;
};

import React from 'react'
import styled from "styled-components";

const ModalWindowWrapper = styled.div`
    position: absolute;
    z-index: 1;
    right: 0;
    width: 20%;
    height: 100%;
    background-color: green;
`;

export const ModalWindow = () => {
  return(
      <ModalWindowWrapper>
          hello
      </ModalWindowWrapper>
  )
};
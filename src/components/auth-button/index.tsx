import React from 'react';
import styled from 'styled-components';
import { lcUpdateHandler } from '../../utils/lc-update-handler';

const AuthButtonWrapper = styled.div`
  width: 10%;
  height: 10%;
  background-color: darkgoldenrod;
  position: fixed;
  top: 10%;
  left: 30%;
  z-index: 10;
`;

export const AuthButton = () => {
  return (
    <AuthButtonWrapper
      onClick={() => {
        window.addEventListener('storage', lcUpdateHandler);
        window.open('/test');
      }}
    >
      Auth button
    </AuthButtonWrapper>
  );
};

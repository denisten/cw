import React from 'react';
import styled from 'styled-components';
import background from './background.png';

const Header = styled.div`
  width: 100%;
  height: 85px;
  background-image: url(${background});
`;

export const HeaderComponent = () => {

  return (
    <Header>
    </Header>
  );
};
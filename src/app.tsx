import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: green;
  width: 200px;
  height: 100px;
`;

export const App: React.FC = () => <Wrapper> Hello world </Wrapper >;
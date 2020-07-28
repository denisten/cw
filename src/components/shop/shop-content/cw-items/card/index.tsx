import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  width: 200px;
  height: 160px;
  background: #ffffff;
  border: 1px solid #dedede;
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 28px 0;
  align-items: center;
`;
export const Card = () => {
  return <CardWrapper></CardWrapper>;
};

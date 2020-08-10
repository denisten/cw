import React from 'react';
import styled from 'styled-components';
import warning from './warning.svg';
import { NumberText } from '..';

const WarningBlock = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 18px;
    height: 18px;
    margin-right: 8px;
  }

  span {
    font-size: 16px;
    line-height: 20px;
    letter-spacing: -0.6px;
    color: #212527;
    opacity: 0.6;
  }
`;
export const ProductWarning = () => {
  return (
    <WarningBlock>
      <img alt="warning" src={warning} />
      <NumberText>Недостаточно валюты.</NumberText>
    </WarningBlock>
  );
};

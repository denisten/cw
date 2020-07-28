import React from 'react';
import styled from 'styled-components';
import coin from './grayCoin.svg';
import { parseSum } from '../../../../utils/parse-sum';

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 16px;
    height: 16px;
    margin-right: 6px;
    font-size: 16px;
    line-height: 24px;

    color: #001424;
  }
`;
export const MoneyCounter: React.FC<{ sum: string }> = ({ sum }) => {
  return (
    <Wrapper>
      <img alt="coin" src={coin} />
      <span>{parseSum(sum)}</span>
    </Wrapper>
  );
};

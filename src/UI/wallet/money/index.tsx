import React from 'react';
import styled from 'styled-components';
import moneyImg from './money.svg';
import { parseSum } from '../../../utils/parse-sum';

export const WalletWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WalletCounter = styled.div<IWalletCounter>`
  width: 100px;
  height: 22px;
  border-radius: 4px;
  background-color: #d6f0f4;
  text-align: center;
  &::after {
    content: "${props => props.sum}";
  }
`;

const styledConfig = {
  img: {
    position: 'relative',
    left: '8px',
  } as React.CSSProperties,
};

export const MoneyWallet: React.FC<IMoneyWallet> = ({ sum, style }) => {
  return (
    <WalletWrapper style={style}>
      <img src={moneyImg} alt="money" style={styledConfig.img} />
      <WalletCounter sum={parseSum(sum)} />
    </WalletWrapper>
  );
};

interface IWalletCounter {
  sum: string;
}

interface IMoneyWallet extends IWalletCounter {
  style?: React.CSSProperties;
}

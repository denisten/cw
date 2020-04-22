import React from 'react';
import styled from 'styled-components';
import moneyImg from './money.svg';
import { parseSum } from '../../../utils/parse-sum';

const defaultWalletCounterWidth = 100,
  defaultContentMargin = 13;

export const WalletWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const WalletCounter = styled.div<IWalletCounter>`
  width: ${props => props.width}px;
  height: 22px;
  border-radius: 4px;
  background-color: #d6f0f4;
  &::after {
    margin-left: ${props => props.contentMargin}px;
    content: "${props => props.sum}";
  }
`;

const styledConfig = {
  img: {
    position: 'relative',
    left: '6px',
  } as React.CSSProperties,
};

export const MoneyWallet: React.FC<IMoneyWallet> = ({
  sum,
  style,
  width = defaultWalletCounterWidth,
  contentMargin = defaultContentMargin,
}) => {
  return (
    <WalletWrapper style={style}>
      <img src={moneyImg} alt="money" style={styledConfig.img} />
      <WalletCounter
        sum={parseSum(sum)}
        width={width}
        contentMargin={contentMargin}
      />
    </WalletWrapper>
  );
};

interface IWalletCounter {
  sum: string;
  width?: number;
  contentMargin?: number;
}

interface IMoneyWallet extends IWalletCounter {
  style?: React.CSSProperties;
}

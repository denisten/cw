import React from 'react';
import { parseSum } from '../../../utils/parse-sum';
import { WalletCounter, WalletWrapper } from '../money';
import coinImg from './coins.svg';
import plusImg from './plus.svg';

const styledConfig = {
  coinImg: {
    position: 'relative',
    left: '8px',
  } as React.CSSProperties,
  plusImg: {
    position: 'relative',
    right: '8px',
    cursor: 'pointer',
  } as React.CSSProperties,
  wallet: {
    width: 105,
    contentMargin: 15,
  },
};

export const CoinsWallet: React.FC<IWalletCounter> = ({ sum }) => {
  return (
    <WalletWrapper>
      <img src={coinImg} alt="coins" style={styledConfig.coinImg} />
      <WalletCounter sum={parseSum(sum)} {...styledConfig.wallet} />
      <img src={plusImg} alt="plus" style={styledConfig.plusImg} />
    </WalletWrapper>
  );
};

interface IWalletCounter {
  sum: string;
}

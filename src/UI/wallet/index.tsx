import React from 'react';
import coinImg from './coins.svg';
import plusImg from './plus.svg';
import styled from 'styled-components';
import { parseSum } from '../../utils/parse-sum';
import { MenuItems } from '../menu-paragraph';
import { menuOpened } from '../../effector/menu-store/events';

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

export const WalletWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const WalletCounter = styled.div<IWalletCounter>`
  width: 100px;
  height: 22px;
  border-radius: 4px;
  background-color: #d6f0f4;
  &::after {
    margin-left: 13px;
    content: "${props => props.sum}";
  }
`;

export const CoinsWallet: React.FC<IWalletCounter> = ({
  sum,
  style = {},
  hidePlus = false,
}) => {
  return (
    <WalletWrapper style={style}>
      <img src={coinImg} alt="coins" style={styledConfig.coinImg} />
      <WalletCounter sum={parseSum(sum)} {...styledConfig.wallet} />
      {!hidePlus && (
        <img
          src={plusImg}
          alt="plus"
          style={styledConfig.plusImg}
          onClick={() => menuOpened(MenuItems.TASKS)}
        />
      )}
    </WalletWrapper>
  );
};

interface IWalletCounter {
  sum: string;
  style?: React.CSSProperties;
  hidePlus?: boolean;
}

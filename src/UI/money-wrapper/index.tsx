import React from 'react';
import styled from 'styled-components';
import { ImgWrapperProps } from '../img-wrapper';
import moneyIcon from './icon_money.png';

const CountWrapper = styled.div`


  color: #fff;
  display: flex;
  align-items: center;

  img {
    margin: 0 13px 0 20px
  }

  span {
    font-size: 28px;
  }
`;

interface MoneyWrapWithCount extends ImgWrapperProps {
  count: number;
}
type MoneyWrapperProp = Omit<MoneyWrapWithCount, 'src'>;


export const MoneyWrapper: React.FC<MoneyWrapperProp> = ({ count }) => {
  return (
    <CountWrapper>

      <img
        alt="moneyIcon"
        src={moneyIcon}
      />
      <span>{count}</span>
    </CountWrapper>
  );
};

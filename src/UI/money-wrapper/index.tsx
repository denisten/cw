import React from 'react';
import styled from 'styled-components';
import { ImgWrapperProps } from '../img-wrapper';
import moneyIcon from './icon_money.png';

const CountWrapper = styled.div`
  font-size: 1.6em;
  width: 73%;
  height: 30%;
  border-radius: 5px;
  box-shadow: 1.1px 1.7px 1.9px 0.1px rgba(26, 120, 169, 0.63);
  border: solid 1px #00f0ff;
  background-color: #1a78a9;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface MoneyWrapWithCount extends ImgWrapperProps {
  count: number;
}
type MoneyWrapperProp = Omit<MoneyWrapWithCount, 'src'>;

const StyleConfig = {
  moneyIcon: {
    marginRight: '5%',
  } as React.CSSProperties,
  numerousWrapper: {
    fontSize: '1.6em',
  },
};

export const MoneyWrapper: React.FC<MoneyWrapperProp> = ({ count }) => {
  return (
    <CountWrapper>
      <img
        alt="moneyIcon"
        src={moneyIcon}
        style={{ ...StyleConfig.moneyIcon }}
      />
      <span style={{ ...StyleConfig.numerousWrapper }}>{count}</span>
    </CountWrapper>
  );
};

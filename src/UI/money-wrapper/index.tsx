import React from 'react';
import styled from 'styled-components';
import { ImgWrapperProps } from '../img-wrapper';
import moneyIcon from './icon_money.png';

const CountWrapper = styled.div<ICountWrapper>`
  color: #fff;
  display: flex;
  align-items: center;

  img {
    margin: 0 13px 0 20px;
  }

  span {
    font-size: ${props => props.fontSize || '28px'};
  }
`;

interface MoneyWrapWithCount extends ImgWrapperProps {
  count: number;
}
type MoneyWrapperProp = Omit<MoneyWrapWithCount, 'src'>;
interface ICountWrapper {
  fontSize?: string;
}

export const MoneyWrapper: React.FC<MoneyWrapperProp> = ({
  count,
  ...props
}) => {
  return (
    <CountWrapper {...props}>
      <img alt="moneyIcon" src={moneyIcon} />
      <span>{count}</span>
    </CountWrapper>
  );
};

import React from 'react';
import styled from 'styled-components';
import { ImgWrapperProps } from '../img-wrapper';
import coin from './coin.svg';

const CountWrapper = styled.div<ICountWrapper>`
  color: #fff;
  display: flex;
  align-items: center;

  img {
    margin: ${props => props.margin || '0 13px 0 0'};
    height: 27px;

    @media (max-resolution: 0.8dppx) {
      height: 1.8vh;
    }
  }

  span {
    font-size: ${props => props.fontSize || '28px'};
    color: ${props => props.color || 'white'};
    font-weight: ${props => props.fontWeight || 'normal'};
    font-family: 'MTSSansRegular';
    line-height: 1.2;

    @media (max-resolution: 0.8dppx) {
      font-size: 1.1vw;
    }
  }
`;

type MoneyWrapperProp = Omit<MoneyWrapWithCount, 'src'>;

export const MoneyWrapper: React.FC<MoneyWrapperProp> = ({
  count,
  ...props
}) => {
  return (
    <CountWrapper {...props}>
      <img alt="moneyIcon" src={coin} />
      <span>{count}</span>
    </CountWrapper>
  );
};

interface ICountWrapper {
  fontSize?: string;
  margin?: string;
  fontWeight?: string;
}
interface MoneyWrapWithCount extends ImgWrapperProps {
  count: number;
}

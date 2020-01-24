import React from 'react';
import styled from 'styled-components';
import moneyWrapperBackground from './money-wrapper-img.png';
import { ImgWrapper, ImgWrapperProps } from '../img-wrapper';

const CountWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 60%;
  font-size: 1.6em;
`;

interface MoneyWrapWithCount extends ImgWrapperProps {
  count: number;
}
type MoneyWrapperProp = Omit<MoneyWrapWithCount, 'src'>;

export const MoneyWrapper: React.FC<MoneyWrapperProp> = ({
  count,
  ...prop
}) => {
  return (
    <ImgWrapper src={moneyWrapperBackground} {...prop}>
      <CountWrapper>{count}</CountWrapper>
    </ImgWrapper>
  );
};

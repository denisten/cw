import React from 'react';
import styled from 'styled-components';
import { MTSSans } from '../../../../fonts';
import plus from './plus.svg';
import minus from './minus.svg';
const ChangeNumberOfProductBlock = styled.div`
  display: flex;
  align-items: center;

  span {
    font-family: ${MTSSans.BOLD};
    font-size: 24px;
    line-height: 32px;
    letter-spacing: -0.6px;
    color: #212527;
    margin: 0 10px;
  }

  img {
    width: 13px;
    height: 13px;
    cursor: pointer;
  }
`;

export const ChangeNumberOfProduct: React.FC<IChangeNumberOfProduct> = ({
  callBack,
  quantity,
}) => {
  return (
    <ChangeNumberOfProductBlock>
      <img alt="minus" src={minus} onClick={() => callBack(quantity - 1)} />
      <span>{quantity}</span>
      <img alt="minus" src={plus} onClick={() => callBack(quantity + 1)} />
    </ChangeNumberOfProductBlock>
  );
};

interface IChangeNumberOfProduct {
  callBack: (arg: number) => void;
  quantity: number;
}

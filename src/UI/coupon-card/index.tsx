import React from 'react';
import styled from 'styled-components';
import { StyledSpan } from '../span';
import { MTSSans } from '../../fonts';
import { Icon, TypeOfIcons } from '../icons';
import { MoneyCounter } from '../../components/shop/shop-content/money-counter';
import { CouponTypes, PromocodeTypes } from '../../effector/coupons/store';
import { TasksType } from '../../components/menu/menu-tasks';
import { TypeOfMarkers } from '../../components/markers';

export const CardWrapper = styled.div<{ active: boolean }>`
  width: 200px;
  height: 160px;
  background: #ffffff;
  border: ${props =>
    props.active ? '3px solid #0CB4D0' : '1px solid rgba(0, 0, 0, 0.1)'};
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 28px 0;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
  transition: border 0.1s;
  position: relative;
`;

export const TitleElem = styled(StyledSpan)`
  font-family: ${MTSSans.BOLD};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.6px;
  color: #212527;
  margin-top: 13px;
  text-align: center;
`;

export const CouponCount = styled.span`
  font-size: 16px;
  line-height: 24px;
  color: #001424;
  position: absolute;
  top: 13px;
  left: 13px;
`;

const styledConfig = {
  icon: {
    width: '55px',
    height: '52px',
  },
};

export const CouponCard: React.FC<ICouponCard> = ({
  callBack,
  active,
  couponsQuantity,
  iconType,
  titleElem,
  price,
}) => {
  return (
    <CardWrapper onClick={callBack} active={active}>
      <CouponCount>{couponsQuantity} шт.</CouponCount>
      <Icon style={styledConfig.icon} type={iconType} />
      <TitleElem>{titleElem}</TitleElem>
      {price && <MoneyCounter sum={String(price)} />}
    </CardWrapper>
  );
};

interface ICouponCard {
  callBack?: () => void;
  active: boolean;
  couponsQuantity?: number;
  iconType:
    | CouponTypes
    | PromocodeTypes
    | TypeOfIcons
    | TasksType
    | TypeOfMarkers;
  titleElem?: string;
  price?: number;
}

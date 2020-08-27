import React from 'react';
import styled from 'styled-components';
import { StyledSpan } from '../span';
import { MTSSans } from '../../fonts';
import { Icon, TypeOfIcons } from '../icons';
import { MoneyCounter } from '../../components/shop/shop-content/money-counter';
import { CouponTypes } from '../../effector/coupons/store';
import { TasksType } from '../../components/menu/menu-tasks';
import { MarkerTypes } from '../../components/markers';
import plus from './plus.svg';

const disableClassName = 'disable';
export const CardWrapper = styled.div<IStates>`
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
  margin-bottom: 10px;

  &.${disableClassName} {
    border: 1px solid rgba(0, 0, 0, 0.1);
    cursor: default;
  }
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
  z-index: 2;
`;

const styledConfig = {
  icon: {
    width: '55px',
    height: '52px',
  },
};

const AddCoupons = styled.img.attrs({ src: plus, alt: 'add coupon' })`
  width: 26px;
  height: 26px;
  cursor: pointer;
`;

const BottomPartWrapper = styled.div<IStates>`
  opacity: ${props => (props.disable ? '0.5' : '1')};
  display: flex;
  flex-direction: inherit;
  align-items: inherit;
`;

export const CouponCard: React.FC<ICouponCard> = ({
  callBack,
  active,
  couponsQuantity,
  iconType,
  titleElem,
  price,
  disable,
  openShopCallBack,
  style,
}) => (
  <CardWrapper
    onClick={callBack}
    active={active}
    className={disable ? disableClassName : ''}
    style={style}
  >
    <CouponCount>
      {disable ? (
        <AddCoupons onClick={openShopCallBack} />
      ) : (
        couponsQuantity + 'шт.'
      )}
    </CouponCount>
    <BottomPartWrapper disable={disable}>
      <Icon style={styledConfig.icon} type={iconType} />
      <TitleElem>{titleElem}</TitleElem>
    </BottomPartWrapper>
    {price && <MoneyCounter sum={String(price)} />}
  </CardWrapper>
);

interface ICouponCard {
  callBack?: () => void;
  active: boolean;
  couponsQuantity?: number;
  iconType: CouponTypes | TypeOfIcons | TasksType | MarkerTypes | string;
  titleElem?: string;
  price?: number;
  disable?: boolean;
  openShopCallBack?: () => void;
  style?: React.CSSProperties;
}

interface IStates {
  active?: boolean;
  disable?: boolean;
}

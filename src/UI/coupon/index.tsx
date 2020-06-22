import React from 'react';
import styled from 'styled-components';
import couponImg from './done.png';
import couponBlurImg from './done-blur.png';
import polygonImg from './polygon.svg';
import { MTSSans } from '../../fonts';
import changeImg from './change.png';

const BlurChange = styled.img`
  opacity: 0.5;
`;

const Polygon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${polygonImg});
  width: 17px;
  height: 17px;
  position: absolute;
  top: 3px;
  right: -8px;
  font-family: ${MTSSans.BOLD};
  font-size: 11px;
  font-weight: bold;
  line-height: 1.82;
  letter-spacing: -0.27px;
  color: #ffffff;
  padding-top: 1px;
`;

const CouponWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const styledConfig = {
  coupon: {},
  polygon: {
    position: 'relative',
    top: 0,
    right: -10,
  } as React.CSSProperties,
};

export const Coupon: React.FC<ICoupon> = ({
  style,
  couponsCount,
  isAllowedToChange = false,
}) => {
  let couponJSX;
  if (!isAllowedToChange) {
    if (couponsCount) {
      couponJSX = (
        <img src={couponImg} alt="coupon" style={styledConfig.coupon} />
      );
    } else {
      couponJSX = (
        <img
          src={couponBlurImg}
          alt="coupon-blur"
          style={styledConfig.coupon}
        />
      );
    }
  } else {
    if (couponsCount) {
      couponJSX = (
        <img src={changeImg} alt="change" style={styledConfig.coupon} />
      );
    } else {
      couponJSX = (
        <BlurChange
          src={changeImg}
          alt="change-blur"
          style={styledConfig.coupon}
        />
      );
    }
  }
  return (
    <CouponWrapper style={style}>
      {couponJSX}
      <Polygon>{couponsCount || '+'}</Polygon>
    </CouponWrapper>
  );
};

interface ICoupon {
  style: React.CSSProperties;
  couponsCount: number;
  isAllowedToChange?: boolean;
}

import React, { useState } from 'react';
import { PopUpContentWrapper } from '../../UI/pop-up-content-wrapper';
import { PopUpTitle } from '../../UI/pop-up';
import styled from 'styled-components';
import { Button, ButtonClassNames } from '../../UI/button';
import { MTSSans } from '../../fonts';
import { useStore } from 'effector-react';
import {
  UserMarketStore,
  CouponTypes,
  TranslatedStoreItem,
} from '../../effector/coupons/store';
import { CouponCard, CardWrapper } from '../../UI/coupon-card';
import { openMarket } from '../../effector/coupons/events';
import { couponHandler } from '../../utils/coupon-handler';
import { TowersTypes } from '../../effector/towers-progress/store';
import { coughtError } from '../../effector/error-boundary-store/events';
import { CouponMWStore } from '../../effector/coupon-MW-store/store';
import { closeCouponModalWindow } from '../../effector/coupon-MW-store/events';

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CancelButton = styled.div`
  font-size: 16px;
  line-height: 20px;
  font-family: ${MTSSans.BOLD};
  color: #02adc9;
  width: 200px;
  text-align: center;
  margin-right: 14px;
  cursor: pointer;
  :after {
    content: 'Отмена';
  }
`;

const ModalPopUpTitle = styled(PopUpTitle)`
  font-size: 36px;
  line-height: 24px;
  letter-spacing: -0.6px;
  color: #212527;
  text-align: left;
  font-family: ${MTSSans.BOLD};
`;

const CouponBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  ${CardWrapper}:last-child {
    margin-right: 0;
  }
`;

const styledConfig = {
  couponWrapper: {
    width: '192px',
    height: '138px',
  },
};

const popUpStyles = {
  width: 535,
  padding: '40px 74px 40px 50px',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  height: 354,
};

export const CouponModalWindow = () => {
  const { userCoupons } = useStore(UserMarketStore);
  const { towerTitle, taskId: id, displayFlag } = useStore(CouponMWStore);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponTypes | null>(
    null
  );

  const modalWindowSubmitHandler = async () => {
    if (selectedCoupon) {
      const couponsCount = userCoupons[selectedCoupon].count;
      if (couponsCount - 1 >= 0) {
        await couponHandler(id, selectedCoupon, towerTitle);
        closeCouponModalWindow();
      } else {
        coughtError({ text: 'Кончились купоны.' });
      }
    }
  };
  const coupons = Object.keys(userCoupons).map((item, index) => {
    const coupon = item as CouponTypes;
    const f = (e: React.MouseEvent) => {
      e.stopPropagation();
      userCoupons[coupon].count && setSelectedCoupon(coupon);
    };
    return (
      <CouponCard
        key={index}
        iconType={coupon}
        active={selectedCoupon === coupon}
        titleElem={TranslatedStoreItem[coupon]}
        couponsQuantity={userCoupons[coupon].count}
        callBack={f}
        disable={!userCoupons[coupon].count}
        openShopCallBack={() => {
          openMarket(true);
          closeCouponModalWindow();
        }}
        style={styledConfig.couponWrapper}
      />
    );
  });

  const buttonClassName = selectedCoupon
    ? ButtonClassNames.NORMAL
    : ButtonClassNames.DISABLED;

  return (
    <PopUpContentWrapper displayFlag={displayFlag} {...popUpStyles}>
      <ModalPopUpTitle>Выбор купона</ModalPopUpTitle>
      <CouponBlock>{coupons}</CouponBlock>
      <ButtonWrapper>
        <CancelButton onClick={() => closeCouponModalWindow()} />
        <Button
          className={buttonClassName}
          content="Использовать"
          callback={modalWindowSubmitHandler}
        />
      </ButtonWrapper>
    </PopUpContentWrapper>
  );
};

export interface IModalWindow {
  style?: React.CSSProperties;
  id: number;
  towerTitle: TowersTypes;
}

import React, { useState } from 'react';
import { PopUpContentWrapper } from '../../UI/pop-up-content-wrapper';
import { PopUpTitle, IPopUpStyles } from '../../UI/pop-up';
import styled from 'styled-components';
import { Button, ButtonClassNames } from '../../UI/button';
import { ITitle } from '../tutorial-slider';
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

const MinorText = styled.span`
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #979797;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CancelButton = styled.div<ITitle>`
  font-size: 16px;
  line-height: 20px;
  font-family:${MTSSans.BOLD};
  color: #02adc9;
  width: 200px;
  text-align: center;
  margin-right: 14px;
  cursor: pointer;
  :after {
    content:"${props => props.content}";
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
    margin-right: 0px;
  }
`;

const styledConfig = {
  couponWrapper: {
    width: '192px',
    height: '138px',
  },
};

const openShop = (callback: () => void) => {
  callback();
  openMarket(true);
};

export const ModalWindow: React.FC<IModalWindow> = ({
  title,
  minorText,
  popUpStyles,
  submitButtonText,
  cancelButtonText = '',
  cancelHandler,
  displayFlag,
  id,
  towerTitle,
}) => {
  const { userCoupons } = useStore(UserMarketStore);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponTypes | null>(
    null
  );

  const modalWindowSubmitHandler = async () => {
    if (selectedCoupon) {
      const couponsCount = userCoupons[selectedCoupon].count;
      if (couponsCount - 1 >= 0) {
        await couponHandler(id, selectedCoupon, towerTitle);
        cancelHandler();
      } else {
        coughtError({ text: 'Кончились купоны.' });
      }
    }
  };
  const coupons = Object.keys(userCoupons).map((item, index) => {
    const coupon = item as CouponTypes;
    return (
      <CouponCard
        key={index}
        iconType={coupon}
        active={selectedCoupon === coupon}
        titleElem={TranslatedStoreItem[coupon]}
        couponsQuantity={userCoupons[coupon].count}
        callBack={() => userCoupons[coupon].count && setSelectedCoupon(coupon)}
        disable={!userCoupons[coupon].count}
        openShopCallBack={() => openShop(cancelHandler)}
        style={styledConfig.couponWrapper}
      />
    );
  });

  const buttonClassName = selectedCoupon
    ? ButtonClassNames.NORMAL
    : ButtonClassNames.DISABLED;

  return (
    <>
      <PopUpContentWrapper displayFlag={displayFlag} {...popUpStyles}>
        <ModalPopUpTitle>{title}</ModalPopUpTitle>
        {minorText && <MinorText>{minorText}</MinorText>}
        <CouponBlock>{coupons}</CouponBlock>
        <ButtonWrapper>
          <CancelButton onClick={cancelHandler} content={cancelButtonText} />
          <Button
            className={buttonClassName}
            content={submitButtonText}
            callback={modalWindowSubmitHandler}
          />
        </ButtonWrapper>
      </PopUpContentWrapper>
    </>
  );
};

interface IModalWindow {
  title: string;
  minorText?: string;
  popUpStyles?: IPopUpStyles;
  submitButtonText: string;
  cancelButtonText?: string;
  cancelHandler: () => void;
  displayFlag: boolean;
  style?: React.CSSProperties;
  id: number;
  towerTitle?: TowersTypes;
}

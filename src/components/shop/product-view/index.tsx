import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import {
  UserMarketStore,
  StoreItemTypes,
} from '../../../effector/coupons/store';
import { StyledSpan } from '../../../UI/span';
import { Icon } from '../../../UI/icons';

import { RowWrapper } from '../../../UI/row-wrapper';
import { UserDataStore } from '../../../effector/user-data/store';
import { ifElse } from 'ramda';
import { ChangeNumberOfProduct } from './change-number-of-product';
import { ProductDescription } from './product-description';
import { ProductTotalPrice } from './product-total-price';
import { ButtonClassNames, Button } from '../../../UI/button';
import { ProductWarning } from './product-warning';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const EmptyProductText = styled(StyledSpan)`
  font-weight: 900;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.6px;
  color: #c6c6c6;
`;

const ProductBuyWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px 15px 70px 30px;
  box-sizing: border-box;
`;

export const NumberText = styled(StyledSpan)`
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.6px;
  color: #212527;
  opacity: 0.6;
`;

const styledConfig = {
  icon: {
    width: '55px',
    height: '52px',
  },
  rowBlock: {
    marginTop: '124px',
    marginBottom: '28px',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    width: 'auto',
  },
};

export const ProductView = () => {
  const { selectedStoreItem } = useStore(UserMarketStore);
  const { money } = useStore(UserDataStore);
  const [numberOfProduct, setNumberOfProduct] = useState(1);
  const [waitingForPurchase, setWaitingForPurchase] = useState(false);

  const checkCouponType = () =>
    selectedStoreItem?.type.slug === StoreItemTypes.COUPON;

  const checkLimitOfBalance = () => {
    const checkBalansForCoupon = () =>
      selectedStoreItem &&
      numberOfProduct * selectedStoreItem?.price <= money &&
      money !== 0 &&
      numberOfProduct !== 0;
    const checkBalanceForOtherType = () =>
      selectedStoreItem && selectedStoreItem?.price < money && money !== 0;
    return ifElse(
      checkCouponType,
      checkBalansForCoupon,
      checkBalanceForOtherType
    )(numberOfProduct);
  };

  const calculateTotalPrice = () => {
    const calculateTotalPriceForCoupon = () =>
      (selectedStoreItem && numberOfProduct * selectedStoreItem?.price) || 0;
    const calculateTotalPriceForOtherPurch = () =>
      (selectedStoreItem && selectedStoreItem?.price) || 0;

    return ifElse(
      checkCouponType,
      calculateTotalPriceForCoupon,
      calculateTotalPriceForOtherPurch
    )('');
  };

  const buyClickHandler = () => {
    setWaitingForPurchase(true);
    setNumberOfProduct(1);
  };

  useEffect(() => {
    if (numberOfProduct === 0) {
      setNumberOfProduct(1);
    }
  }, [numberOfProduct]);

  return (
    <Wrapper>
      {selectedStoreItem ? (
        <ProductBuyWrapper>
          <ProductDescription selectedStoreItem={selectedStoreItem} />
          <RowWrapper>
            <Icon style={styledConfig.icon} type={selectedStoreItem.slug} />
            {checkCouponType() && (
              <ChangeNumberOfProduct
                numberOfProduct={numberOfProduct}
                callBack={setNumberOfProduct}
              />
            )}
          </RowWrapper>

          <RowWrapper style={styledConfig.rowBlock}>
            <ProductTotalPrice callBack={calculateTotalPrice} />
            <Button
              className={
                checkLimitOfBalance() && !waitingForPurchase
                  ? ButtonClassNames.COIN_BUTTON
                  : ButtonClassNames.COIN_BUTTON_DISABLED
              }
              content="Купить"
              callback={buyClickHandler}
            />
          </RowWrapper>
          {!checkLimitOfBalance() && <ProductWarning />}
        </ProductBuyWrapper>
      ) : (
        <EmptyProductText>Выберите товар</EmptyProductText>
      )}
    </Wrapper>
  );
};

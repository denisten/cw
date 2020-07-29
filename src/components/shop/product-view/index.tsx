import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import {
  UserMarketStore,
  StoreItemTypes,
} from '../../../effector/coupons/store';
import { StyledSpan } from '../../../UI/span';
import { Icon, TypeOfIcons } from '../../../UI/icons';

import warning from './warning.svg';
import { RowWrapper } from '../../../UI/row-wrapper';
import { UserDataStore } from '../../../effector/user-data/store';
import { parseSum } from '../../../utils/parse-sum';
import { ifElse } from 'ramda';
import { ChangeNumberOfProduct } from './change-number-of-product';
import { ProductDescription } from './product-description';
import { MTSSans } from '../../../fonts';
import { ProductTotalPrice } from './product-total-price';

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
};

const WarningBlock = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 18px;
    height: 18px;
    margin-right: 8px;
  }

  span {
    font-size: 16px;
    line-height: 20px;
    letter-spacing: -0.6px;
    color: #212527;
    opacity: 0.6;
  }
`;

export const ProductView = () => {
  const { selectedStoreItem } = useStore(UserMarketStore);
  const { money } = useStore(UserDataStore);
  const [numberOfProduct, setNumberOfProduct] = useState(1);

  const checkCouponType = () =>
    selectedStoreItem?.type.slug === StoreItemTypes.COUPON;

  const checkLimitOfBalance = () => {
    const checkBalansForCoupon = () =>
      (selectedStoreItem &&
        numberOfProduct * selectedStoreItem?.price < money) ||
      selectedStoreItem?.price === 0;
    const checkBalanceForOtherType = () =>
      selectedStoreItem && selectedStoreItem?.price < money;
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

  useEffect(() => {
    if (numberOfProduct < 0) {
      setNumberOfProduct(0);
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
          {!checkLimitOfBalance() && (
            <WarningBlock>
              <img alt="warning" src={warning} />
              <NumberText>Не достаточно яйцекойнов.</NumberText>
            </WarningBlock>
          )}

          <RowWrapper style={styledConfig.rowBlock}>
            <ProductTotalPrice callBack={calculateTotalPrice} />
          </RowWrapper>
        </ProductBuyWrapper>
      ) : (
        <EmptyProductText>Выберите товар</EmptyProductText>
      )}
    </Wrapper>
  );
};

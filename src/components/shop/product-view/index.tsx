import React, { useState } from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { UserMarketStore } from '../../../effector/coupons/store';
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
import {
  checkCouponType,
  checkBalansForCoupon,
  checkBalanceForOtherType,
  calculateTotalPriceForCoupon,
  calculateTotalPriceForOtherPurchases,
} from '../../../utils/support-shop-functions';
import { useCheckQuantity } from '../../../hooks/use-check-quantity';

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

const ProductView = () => {
  const { selectedStoreItem } = useStore(UserMarketStore);
  const { money } = useStore(UserDataStore);
  const [quantity, setQuantity] = useState(1);
  const [waitingForPurchase, setWaitingForPurchase] = useState(false);

  const checkUserBalance = () =>
    ifElse(
      () => checkCouponType(selectedStoreItem),
      () => checkBalansForCoupon(selectedStoreItem, quantity, money),
      () => checkBalanceForOtherType(selectedStoreItem, money)
    )(quantity);

  const calculateTotalPrice = () =>
    ifElse(
      () => checkCouponType(selectedStoreItem),
      () => calculateTotalPriceForCoupon(selectedStoreItem, quantity),
      () => calculateTotalPriceForOtherPurchases(selectedStoreItem)
    )('');

  const buyClickHandler = () => {
    setWaitingForPurchase(true);
    setQuantity(1);
  };

  useCheckQuantity(quantity, setQuantity);

  const selectClassNameForButton = () => {
    return checkUserBalance() && !waitingForPurchase
      ? ButtonClassNames.COIN_BUTTON
      : ButtonClassNames.COIN_BUTTON_DISABLED;
  };

  return (
    <Wrapper>
      {selectedStoreItem ? (
        <ProductBuyWrapper>
          <ProductDescription selectedStoreItem={selectedStoreItem} />
          <RowWrapper>
            <Icon style={styledConfig.icon} type={selectedStoreItem.slug} />
            {checkCouponType(selectedStoreItem) && (
              <ChangeNumberOfProduct
                quantity={quantity}
                callBack={setQuantity}
              />
            )}
          </RowWrapper>

          <RowWrapper style={styledConfig.rowBlock}>
            <ProductTotalPrice callBack={calculateTotalPrice} />
            <Button
              className={selectClassNameForButton()}
              content="Купить"
              callback={buyClickHandler}
            />
          </RowWrapper>
          {!checkUserBalance() && <ProductWarning />}
        </ProductBuyWrapper>
      ) : (
        <EmptyProductText>Выберите товар</EmptyProductText>
      )}
    </Wrapper>
  );
};

export default ProductView;

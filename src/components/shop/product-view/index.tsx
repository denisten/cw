import React, { useState } from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import {
  UserMarketStore,
  PurchasStatuses,
  StoreItemTypes,
  PromocodeTypes,
  ICatalogItems,
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
import {
  checkCouponType,
  checkBalansForCoupon,
  checkBalanceForOtherType,
  calculateTotalPriceForCoupon,
  calculateTotalPriceForOtherPurchases,
  checkPromocodeTypeType,
} from '../../../utils/support-shop-functions';
import { useCheckQuantity } from '../../../hooks/use-check-quantity';

import { buyItem } from '../../../effector/coupons/events';
import { MTSSans } from '../../../fonts';
import { activatePromocode } from '../../../api/shop-api/activate-promocode';

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
  activateRowBlock: {
    justifyContent: 'center',
    marginTop: '40px',
  },
  activateButton: {
    fontSize: '16px',
    lineHeight: '20px',
    fontFamily: MTSSans.REGULAR,
    borderRadius: '10px',
  },
};

const SelectedStoreItem: React.FC<{ selectedStoreItem: ICatalogItems }> = ({
  selectedStoreItem,
}) => {
  const { showUserPromocodes, userPromocodes } = useStore(UserMarketStore);

  const { money } = useStore(UserDataStore);
  const [quantity, setQuantity] = useState(1);
  const [waitingForPurchase, setWaitingForPurchase] = useState(false);
  const itIsCoupon = checkCouponType(selectedStoreItem);
  const canBuyThisItem = itIsCoupon || (!itIsCoupon && !showUserPromocodes);
  const itIsNewPromocode =
    selectedStoreItem.type.slug === StoreItemTypes.PROMO_CODE &&
    userPromocodes[selectedStoreItem.slug as PromocodeTypes].status ===
      PurchasStatuses.NEW;

  const canActivatePromocode =
    showUserPromocodes &&
    checkPromocodeTypeType(selectedStoreItem) &&
    itIsNewPromocode;

  const checkUserBalance = () =>
    ifElse(
      () => checkCouponType(selectedStoreItem),
      () => checkBalansForCoupon(selectedStoreItem, quantity, money),
      () => checkBalanceForOtherType(selectedStoreItem, money)
    )('');

  const calculateTotalPrice = () =>
    ifElse(
      () => checkCouponType(selectedStoreItem),
      () => calculateTotalPriceForCoupon(selectedStoreItem, quantity),
      () => calculateTotalPriceForOtherPurchases(selectedStoreItem)
    )('');

  const buyClickHandler = async () => {
    setWaitingForPurchase(true);
    await buyItem(selectedStoreItem.slug);
    setWaitingForPurchase(false);
    setQuantity(1);
  };

  const activate = async () => {
    setWaitingForPurchase(true);
    await activatePromocode(selectedStoreItem?.slug);
    setWaitingForPurchase(false);
  };

  useCheckQuantity(quantity, setQuantity);
  const activeCoinButton = checkUserBalance() && !waitingForPurchase;

  return (
    <ProductBuyWrapper>
      <ProductDescription selectedStoreItem={selectedStoreItem} />
      <RowWrapper>
        <Icon style={styledConfig.icon} type={selectedStoreItem.slug} />
        {itIsCoupon && (
          <ChangeNumberOfProduct quantity={quantity} callBack={setQuantity} />
        )}
      </RowWrapper>

      {canBuyThisItem && (
        <RowWrapper style={styledConfig.rowBlock}>
          <ProductTotalPrice callBack={calculateTotalPrice} />
          <Button
            className={
              activeCoinButton
                ? ButtonClassNames.COIN_BUTTON
                : ButtonClassNames.COIN_BUTTON_DISABLED
            }
            content="Купить"
            callback={buyClickHandler}
          />
        </RowWrapper>
      )}
      {canActivatePromocode && (
        <RowWrapper style={styledConfig.activateRowBlock}>
          <Button
            className={
              waitingForPurchase
                ? ButtonClassNames.DISABLED
                : ButtonClassNames.NORMAL
            }
            content="Активировать промокод"
            callback={activate}
            style={styledConfig.activateButton}
          />
        </RowWrapper>
      )}
      {!checkUserBalance() && <ProductWarning />}
    </ProductBuyWrapper>
  );
};

const ProductView = () => {
  const { selectedStoreItem } = useStore(UserMarketStore);
  return (
    <Wrapper>
      {selectedStoreItem ? (
        <SelectedStoreItem selectedStoreItem={selectedStoreItem} />
      ) : (
        <EmptyProductText>Выберите товар</EmptyProductText>
      )}
    </Wrapper>
  );
};

export default ProductView;

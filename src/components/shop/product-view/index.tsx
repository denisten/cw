import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import {
  UserMarketStore,
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
import { MTSSans } from '../../../fonts';
import { buyItemRequest } from '../../../api/shop-api/buy-item';
import copy from './copy.svg';

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
  padding: 30px 32px 70px 30px;
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
    paddingRight: '10px',
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

const PromocodeContent = styled.div`
  width: 238px;
  height: 50px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PromocodeText = styled(StyledSpan)`
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.6px;
  color: #212527;
  font-family: ${MTSSans.BOLD};
`;

const CopyPromocode = styled.img.attrs({ alt: 'copy', src: copy })`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const SelectedStoreItem: React.FC<{ selectedStoreItem: ICatalogItems }> = ({
  selectedStoreItem,
}) => {
  const { showUserPromocodes, userPromocodes } = useStore(UserMarketStore);

  const { money } = useStore(UserDataStore);
  const [quantity, setQuantity] = useState(1);
  const [waitingForPurchase, setWaitingForPurchase] = useState(false);
  const promocodeTextRef = useRef<HTMLSpanElement>(null);
  const itIsCoupon = checkCouponType(selectedStoreItem);
  const canBuyThisItem = itIsCoupon || (!itIsCoupon && !showUserPromocodes);
  const promocodeContent =
    userPromocodes[selectedStoreItem.slug as PromocodeTypes]?.content;

  const canUsePromocode =
    showUserPromocodes &&
    checkPromocodeTypeType(selectedStoreItem) &&
    promocodeContent;

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
    const quantityItem = itIsCoupon
      ? { item: selectedStoreItem.slug, quantity }
      : { item: selectedStoreItem.slug, quantity: 1 };
    await buyItemRequest(quantityItem);
    setWaitingForPurchase(false);
    setQuantity(1);
  };

  const copyPromocode = () => {
    const node = promocodeTextRef?.current as Node;
    const selection = window.getSelection() as Selection;
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
  };

  useCheckQuantity(quantity, setQuantity);
  const activeCoinButton =
    checkUserBalance() && !waitingForPurchase && !promocodeContent;

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
      {canUsePromocode && (
        <RowWrapper style={styledConfig.activateRowBlock}>
          <PromocodeContent>
            <PromocodeText ref={promocodeTextRef}>
              {promocodeContent}
            </PromocodeText>
            <CopyPromocode onClick={copyPromocode} />
          </PromocodeContent>
        </RowWrapper>
      )}
      {!checkUserBalance() && !canUsePromocode && <ProductWarning />}
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

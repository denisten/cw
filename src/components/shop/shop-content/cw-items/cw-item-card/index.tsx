import React from 'react';
import {
  ICatalogItems,
  UserMarketStore,
  CouponTypes,
} from '../../../../../effector/coupons/store';
import { selectStoreItem } from '../../../../../effector/coupons/events';
import { useStore } from 'effector-react';
import { CouponCard } from '../../../../../UI/coupon-card';

export const CWItemCard: React.FC<ICWItemCard> = ({ catalogItem }) => {
  const { selectedStoreItem, userCoupons } = useStore(UserMarketStore);
  const couponsQuantity =
    userCoupons[catalogItem.slug as CouponTypes].count || 0;

  const checkActiveElem = selectedStoreItem?.slug === catalogItem.slug;
  return (
    <CouponCard
      callBack={() => selectStoreItem(catalogItem)}
      active={checkActiveElem}
      couponsQuantity={couponsQuantity}
      iconType={catalogItem.slug}
      titleElem={catalogItem.name.replace(/Купон/gi, '')}
      price={catalogItem.price}
    />
  );
};

interface ICWItemCard {
  catalogItem: ICatalogItems;
}

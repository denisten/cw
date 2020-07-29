import { ICatalogItems, StoreItemTypes } from '../../effector/coupons/store';

export const checkCouponType: (
  selectedStoreItem: ICatalogItems | null
) => boolean = selectedStoreItem =>
  selectedStoreItem?.type.slug === StoreItemTypes.COUPON;

export const checkBalansForCoupon = (
  selectedStoreItem: ICatalogItems | null,
  numberOfProduct: number,
  money: number
) =>
  selectedStoreItem &&
  numberOfProduct * selectedStoreItem?.price <= money &&
  money !== 0 &&
  numberOfProduct !== 0;

export const checkBalanceForOtherType = (
  selectedStoreItem: ICatalogItems | null,
  money: number
) => selectedStoreItem && selectedStoreItem?.price < money && money !== 0;

export const calculateTotalPriceForCoupon = (
  selectedStoreItem: ICatalogItems | null,
  numberOfProduct: number
) => (selectedStoreItem && numberOfProduct * selectedStoreItem?.price) || 0;
export const calculateTotalPriceForOtherPurch = (
  selectedStoreItem: ICatalogItems | null
) => (selectedStoreItem && selectedStoreItem?.price) || 0;

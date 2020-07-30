import { ICatalogItems, StoreItemTypes } from '../../effector/coupons/store';

export const checkCouponType = (selectedStoreItem: ICatalogItems | null) =>
  selectedStoreItem?.type.slug === StoreItemTypes.COUPON;

export const checkBalansForCoupon = (
  selectedStoreItem: ICatalogItems | null,
  quantity: number,
  money: number
) =>
  selectedStoreItem &&
  quantity * selectedStoreItem?.price <= money &&
  money !== 0 &&
  quantity !== 0;

export const checkBalanceForOtherType = (
  selectedStoreItem: ICatalogItems | null,
  money: number
) => selectedStoreItem && selectedStoreItem?.price < money && money !== 0;

export const calculateTotalPriceForCoupon = (
  selectedStoreItem: ICatalogItems | null,
  quantity: number
) => (selectedStoreItem && quantity * selectedStoreItem?.price) || 0;
export const calculateTotalPriceForOtherPurchases = (
  selectedStoreItem: ICatalogItems | null
) => (selectedStoreItem && selectedStoreItem?.price) || 0;

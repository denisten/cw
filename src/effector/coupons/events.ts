import { StoreDomain } from './domain';
import { CouponTypes } from './store';
import { getUserPurchases } from '../../api/get-user-purchases';
import { getShopCatalog } from '../../api/shop-api/get-shop-catalog';

export const fetchUserPurchases = StoreDomain.effect('fetch purchases', {
  handler: async () => {
    return await getUserPurchases();
  },
});

export const fetchShopCatalog = StoreDomain.effect('fetch catalog', {
  handler: async () => {
    return await getShopCatalog();
  },
});

export const editCouponCount = StoreDomain.event<IEditCouponCount>('');

interface IEditCouponCount {
  couponType: CouponTypes;
  count: number;
}

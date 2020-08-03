import { StoreDomain } from './domain';
import { CouponTypes, ICatalogItems, PromocodeTypes } from './store';
import { getUserPurchases } from '../../api/get-user-purchases';
import { getShopCatalog } from '../../api/shop-api/get-shop-catalog';
import { buyItemRequest } from '../../api/shop-api/buy-item';

export const fetchUserPurchases = StoreDomain.effect('fetch purchases', {
  handler: async () => {
    const response = await getUserPurchases();
    return response;
  },
});

export const fetchShopCatalog = StoreDomain.effect('fetch catalog', {
  handler: async () => {
    return await getShopCatalog();
  },
});

export const buyItem = StoreDomain.effect('fetch catalog', {
  handler: async (item: CouponTypes | PromocodeTypes) => {
    return await buyItemRequest(item);
  },
});

export const editCouponCount = StoreDomain.event<IEditCouponCount>('');
export const selectStoreItem = StoreDomain.event<ICatalogItems>('');
export const toggleShowUserPromocodes = StoreDomain.event('');
export const openMarket = StoreDomain.event<boolean>('');

export const resetUserShopStore = StoreDomain.event('reset store');

interface IEditCouponCount {
  couponType: CouponTypes;
  count: number;
}

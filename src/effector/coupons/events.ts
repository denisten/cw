import { StoreDomain } from './domain';
import { CouponTypes, ICatalogItems, PromocodeTypes } from './store';
import { getUserPurchases } from '../../api/get-user-purchases';
import { getShopCatalog } from '../../api/shop-api/get-shop-catalog';
import { buyItemRequest } from '../../api/shop-api/buy-item';

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

export const buyItem = StoreDomain.effect('buy item', {
  handler: async (data: {
    item: CouponTypes | PromocodeTypes;
    quantity: number;
  }) => {
    return await buyItemRequest(data);
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

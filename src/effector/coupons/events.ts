import { StoreDomain } from './domain';
import { CouponTypes, ICatalogItems, PurchasStatuses } from './store';
import { getShopCatalog } from '../../api/shop-api/get-shop-catalog';

export const fetchUserPurchases = StoreDomain.event<IUserPurchases[]>();
export const fetchShopCatalog = StoreDomain.effect('fetch catalog', {
  handler: async () => {
    return await getShopCatalog();
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

export interface IUserPurchasesSocketItem {
  data: IUserPurchases[];
}

export interface IUserPurchases {
  storeItem: ICatalogItems;
  status: PurchasStatuses | null;
  content: null | string;
}

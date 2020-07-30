import { StoreDomain } from './domain';
import {
  fetchUserPurchases,
  editCouponCount,
  fetchShopCatalog,
  selectStoreItem,
  toggleShowUserPromocodes,
  openMarket,
} from './events';

export enum CouponTypes {
  COUPON_REPLACE = 'coupon.task.replace',
  COUPON_SKIP = 'coupon.task.skip',
}

export enum PurchasesType {
  COUPONS = 'coupons',
  MTS_PURCH = 'mtsPurch',
  PROMO = 'promo',
}

export enum StoreItemTypes {
  COUPON = 'coupon',
}

const initState = {
  catalog: [],
  selectedStoreItem: null,
  userCoupons: {
    [CouponTypes.COUPON_REPLACE]: { count: 0 },
    [CouponTypes.COUPON_SKIP]: { count: 0 },
  },
  showUserPromocodes: false,
  openedMarket: false,
};

export const UserMarketStore = StoreDomain.store<IUserStore>(initState)
  .on(openMarket, (state, payload) => ({
    ...state,
    openedMarket: payload,
  }))
  .on(toggleShowUserPromocodes, state => ({
    ...state,
    showUserPromocodes: !state.showUserPromocodes,
  }))
  .on(selectStoreItem, (state, payload) => ({
    ...state,
    selectedStoreItem: payload,
  }))
  .on(fetchShopCatalog.doneData, (state, payload) => ({
    ...state,
    catalog: payload,
  }))
  .on(fetchUserPurchases.doneData, (state, payload) => {
    const stateClone = { ...state };
    if (payload.items.length > 0) {
      payload.items.forEach(({ storeItem, count }) => {
        if (storeItem.type.slug === StoreItemTypes.COUPON) {
          stateClone.userCoupons[storeItem.slug] = { count };
        }
      });
    }
    return stateClone;
  })
  .on(editCouponCount, (state, { couponType, count }) => ({
    ...state,
    userCoupons: {
      ...state.userCoupons,
      [couponType]: { count },
    },
  }));

interface IUserStore {
  catalog: IShopCatalog[];
  selectedStoreItem: ICatalogItems | null;
  userCoupons: {
    [key in CouponTypes]: { count: number };
  };
  showUserPromocodes: boolean;
  openedMarket: boolean;
}

export interface IShopCatalog {
  name: string;
  slug: PurchasesType;
  items: ICatalogItems[];
}

export interface ICatalogItems {
  type: {
    slug: StoreItemTypes;
  };
  price: number;
  slug: CouponTypes;
  name: string;
  description: string;
}

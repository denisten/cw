import { StoreDomain } from './domain';
import {
  fetchUserPurchases,
  editCouponCount,
  fetchShopCatalog,
} from './events';

export enum CouponTypes {
  COUPON_REPLACE = 'coupon-replace',
  COUPON_SKIP = 'coupon-skip',
}

export enum PurchasesType {
  COUPON = 'coupons',
  MTS_PURCH = 'mtsPurch',
}

const initState = {
  catalog: [],
  userCoupons: {
    [CouponTypes.COUPON_REPLACE]: { count: 0 },
    [CouponTypes.COUPON_SKIP]: { count: 0 },
  },
};

interface IUserStore {
  catalog: IShopCatalog[];
  userCoupons: {
    [key in CouponTypes]: { count: number };
  };
}

export interface IShopCatalog {
  name: string;
  slug: PurchasesType;
  items: ICatalogItems[];
}

export interface ICatalogItems {
  type: {
    slug: PurchasesType;
  };
  price: number;
  slug: CouponTypes;
  name: string;
  description: string;
}

export const UserMarketStore = StoreDomain.store<IUserStore>(initState)
  .on(fetchShopCatalog.doneData, (state, payload) => ({
    ...state,
    catalog: payload,
  }))
  .on(fetchUserPurchases.doneData, (state, payload) => {
    const stateClone = { ...state };
    if (payload.items.length > 0) {
      payload.items.forEach(({ storeItem, count }) => {
        if (storeItem.type.slug === PurchasesType.COUPON) {
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

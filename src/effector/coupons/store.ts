import { StoreDomain } from './domain';
import { fetchUserPurchases, editCouponCount } from './events';

export enum CouponTypes {
  COUPON_REPLACE = 'coupon-replace',
}

export enum PurchasesType {
  COUPON = 'coupon',
}

const initState = {
  userCoupons: {
    [CouponTypes.COUPON_REPLACE]: { count: 0 },
  },
};

interface IUserStore {
  userCoupons: {
    [key in CouponTypes]: { count: number };
  };
}

export const UserMarketStore = StoreDomain.store<IUserStore>(initState)
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

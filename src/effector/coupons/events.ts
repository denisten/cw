import { StoreDomain } from './domain';
import { CouponTypes } from './store';
import { getUserPurchases } from '../../api/get-user-purchases';

export const fetchUserPurchases = StoreDomain.effect('fetch purchases', {
  handler: async () => {
    return await getUserPurchases();
  },
});

export const editCouponCount = StoreDomain.event<IEditCouponCount>('');

interface IEditCouponCount {
  couponType: CouponTypes;
  count: number;
}

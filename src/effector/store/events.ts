import { StoreDomain } from './domain';
import { getUserPurchases } from '../../api/get-user-purchases';
import { CouponTypes } from './store';

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

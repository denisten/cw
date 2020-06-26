import { StoreDomain } from './domain';
import { getUserPurchases } from '../../api/get-user-purchases';

export const fetchUserPurchases = StoreDomain.effect('fetch purchases', {
  handler: async () => {
    return await getUserPurchases();
  },
});

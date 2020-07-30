import { useEffect } from 'react';
import { fetchShopCatalog } from '../../effector/coupons/events';
import { IShopCatalog } from '../../effector/coupons/store';

export const useFetchShopCatalog = (
  openedMarket: boolean,
  catalog: IShopCatalog[]
) => {
  useEffect(() => {
    openedMarket && catalog.length === 0 && fetchShopCatalog('');
  }, [openedMarket]);
};

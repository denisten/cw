import { useEffect } from 'react';
import { fetchShopCatalog } from '../../effector/coupons/events';
import { ICatalogItems } from '../../effector/coupons/store';

export const useFetchShopCatalog = (
  openedMarket: boolean,
  catalog: ICatalogItems[]
) => {
  useEffect(() => {
    openedMarket && catalog.length === 0 && fetchShopCatalog('');
  }, [openedMarket]);
};

import React from 'react';
import headerBg from './header-bg.svg';
import { ShopItemsHeader } from '../shop-items-header';
import styled from 'styled-components';
import { MTSItemCard } from './mts-item-card';
import { useStore } from 'effector-react';
import {
  UserMarketStore,
  PurchasesType,
} from '../../../../effector/coupons/store';
const MTSItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MTSItems = () => {
  const MTSCatalog = useStore(UserMarketStore)
    .catalog.filter(item => item.slug === PurchasesType.PROMO_CODES)
    .map(item => item.items)
    .flat();
  return (
    <MTSItemsWrapper>
      <ShopItemsHeader headerText="МТС" background={headerBg} />
      {MTSCatalog.map((mtsItem, ind) => (
        <MTSItemCard key={ind} catalogItem={mtsItem} />
      ))}
    </MTSItemsWrapper>
  );
};

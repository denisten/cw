import React from 'react';
import headerBg from './header-bg.svg';
import { ShopItemsHeader } from '../shop-items-header';
import styled from 'styled-components';
import { MTSItemCard } from './mts-item-card';
import { useStore } from 'effector-react';
import {
  UserMarketStore,
  PurchasesType,
  ShopItemsType,
} from '../../../../effector/coupons/store';
import { ifElse } from 'ramda';
const MTSItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MTSCatalogItems = () => {
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

const UserCatalogItems = () => {
  const { userItems } = useStore(UserMarketStore);
  const userPromocodes = Object.keys(userItems)
    .filter(item => item === ShopItemsType.MGTS_SPECIAL)
    .map(item => {
      const userItem = item as ShopItemsType;
      return userItems[userItem].storeItem;
    });

  return (
    <MTSItemsWrapper>
      <ShopItemsHeader headerText="МТС" background={headerBg} />
      {userPromocodes.map((mtsItem, ind) => (
        <MTSItemCard key={ind} catalogItem={mtsItem} />
      ))}
    </MTSItemsWrapper>
  );
};

export const MTSItems = () => {
  const { showUserPromocodes } = useStore(UserMarketStore);

  return ifElse(
    () => showUserPromocodes,
    () => <UserCatalogItems />,
    () => <MTSCatalogItems />
  )('');
};

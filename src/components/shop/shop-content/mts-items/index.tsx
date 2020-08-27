import React from 'react';
import headerBg from './header-bg.svg';
import { ShopItemsHeader } from '../shop-items-header';
import styled from 'styled-components';
import { MTSItemCard } from './mts-item-card';
import { useStore } from 'effector-react';
import {
  UserMarketStore,
  StoreItemTypes,
  PurchasStatuses,
} from '../../../../effector/coupons/store';
import { ifElse } from 'ramda';
const MTSItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MTSCatalogItems = () => {
  const { userPromocodes } = useStore(UserMarketStore);

  const MTSCatalog = useStore(UserMarketStore)
    .catalog.filter(
      item =>
        item.type.slug === StoreItemTypes.PROMO_CODE &&
        !userPromocodes[item.slug]?.status
    )
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
  const { userPromocodes } = useStore(UserMarketStore);
  const userPromocodesArray = Object.keys(userPromocodes).map(item => {
    return userPromocodes[item].storeItem;
  });

  return (
    <MTSItemsWrapper>
      <ShopItemsHeader headerText="МТС" background={headerBg} />
      {userPromocodesArray.map((userPromocode, ind) => (
        <MTSItemCard key={ind} catalogItem={userPromocode} />
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

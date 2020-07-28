import React from 'react';
import styled from 'styled-components';
import { ShopItemsHeader } from '../shop-items-header';
import headerBg from './header.svg';
import { Card } from './card';
import { useStore } from 'effector-react';
import {
  UserMarketStore,
  PurchasesType,
} from '../../../../effector/coupons/store';

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  margin-bottom: 35px;
`;

export const ClientWorldItems = () => {
  const clientWorldCatalog = useStore(UserMarketStore)
    .catalog.filter(item => item.slug === PurchasesType.COUPON)
    .map(item => item.items)
    .flat();

  return (
    <Wrapper>
      <ShopItemsHeader headerText="Мир клиента" background={headerBg} />
      <Content>
        {clientWorldCatalog.map((catalogItem, ind) => (
          <Card catalogItem={catalogItem} key={ind} />
        ))}
      </Content>
    </Wrapper>
  );
};

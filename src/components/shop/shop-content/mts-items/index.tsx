import React from 'react';
import headerBg from './headerBg.svg';
import { ShopItemsHeader } from '../shop-items-header';
import styled from 'styled-components';
import { MTSItemCard } from './mts-item-card';
const MTSItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MTSItems = () => {
  return (
    <MTSItemsWrapper>
      <ShopItemsHeader headerText="МТС" background={headerBg} />
      <MTSItemCard />
    </MTSItemsWrapper>
  );
};

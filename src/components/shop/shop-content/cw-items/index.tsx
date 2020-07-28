import React from 'react';
import styled from 'styled-components';
import { ShopItemsHeader } from '../shop-items-header';
import headerBg from './header.svg';
import { Card } from './card';

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
  return (
    <Wrapper>
      <ShopItemsHeader headerText="Мир клиента" background={headerBg} />
      <Content>
        <Card />
      </Content>
    </Wrapper>
  );
};

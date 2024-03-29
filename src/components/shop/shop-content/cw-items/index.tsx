import React from 'react';
import styled from 'styled-components';
import { ShopItemsHeader } from '../shop-items-header';
import headerBg from './header.svg';
import { CWItemCard } from './cw-item-card';
import { useStore } from 'effector-react';
import {
  UserMarketStore,
  StoreItemTypes,
} from '../../../../effector/coupons/store';
import { AppConditionStore } from '../../../../effector/app-condition/store';
import { Icon, TypeOfIcons } from '../../../../UI/icons';
import { MoneyCounter } from '../money-counter';
import { handleAuthButtonClick } from '../../../../utils/handle-auth-button-click';
import { ifElse } from 'ramda';
import { CardWrapper, TitleElem } from '../../../../UI/coupon-card';

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  margin-bottom: 35px;
  flex-wrap: wrap;
`;
const styledConfig = {
  icon: {
    width: '41px',
    height: '41px',
  },
};

const CatalogInNotAuthZone: React.FC = () => (
  <>
    <ShopItemsHeader headerText="Вход" background={headerBg} />
    <Content>
      <CardWrapper active={false} onClick={handleAuthButtonClick}>
        <Icon style={styledConfig.icon} type={TypeOfIcons.ENTER} />
        <TitleElem>Войти в мир</TitleElem>
        <MoneyCounter sum="400" />
      </CardWrapper>
    </Content>
  </>
);

const CatalogInAuthZone: React.FC = () => {
  const clientWorldCatalog = useStore(UserMarketStore)
    .catalog.filter(item => item.type.slug === StoreItemTypes.COUPON)
    .flat();

  return (
    <>
      <ShopItemsHeader headerText="Мир клиента" background={headerBg} />
      <Content>
        {clientWorldCatalog &&
          clientWorldCatalog.map((catalogItem, ind) => (
            <CWItemCard catalogItem={catalogItem} key={ind} />
          ))}
      </Content>
    </>
  );
};

export const ClientWorldItems: React.FC = () => {
  const { isAuthorized } = useStore(AppConditionStore);

  return (
    <Wrapper>
      {ifElse(
        () => isAuthorized,
        () => <CatalogInAuthZone />,
        () => <CatalogInNotAuthZone />
      )('')}
    </Wrapper>
  );
};

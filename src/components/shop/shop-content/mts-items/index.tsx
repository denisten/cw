import React from 'react';
import headerBg from './header-bg.svg';
import { ShopItemsHeader } from '../shop-items-header';
import styled from 'styled-components';
import { MTSItemCard } from './mts-item-card';
import { useStore } from 'effector-react';
import {
  UserMarketStore,
  StoreItemTypes,
} from '../../../../effector/coupons/store';
import { ifElse } from 'ramda';
import { Icon, TypeOfIcons } from '../../../../UI/icons';
import { MTSSans } from '../../../../fonts';
const MTSItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
enum EmptyPromoCodeClassNames {
  TITLE = 'title',
  TEXT = 'text',
}
const EmptyPromoCodeWrapper = styled.div<IEmptyPromoCodeWrapper>`
  display: grid;
  grid-template-columns: 62px 1fr;
  grid-template-rows: ${props => (props.haveTwoRows ? '1fr 1fr 1fr' : '')};
  align-items: center;
  grid-template-areas:
    'icon title'
    'icon text'
    '. .';
  padding-left: 22px;
  box-sizing: border-box;

  img {
    grid-area: icon;
  }

  .${EmptyPromoCodeClassNames.TITLE} {
    grid-area: title;
    font-family: ${MTSSans.BOLD};
    font-size: 24px;
    line-height: 32px;
    letter-spacing: -0.6px;

    color: #d8d8d8;
  }

  .${EmptyPromoCodeClassNames.TEXT} {
    grid-area: text;
    font-size: 14px;
    line-height: 32px;
    letter-spacing: -0.6px;
    color: #d8d8d8;
  }
`;

const styledConfig = {
  icon: {
    width: '40px',
    height: '26px',
  },
};

const emptyPromoCodesText = {
  mtsShop: {
    titleText: 'Промокоды закончились :(',
    text: 'Скоро мы добавим новые, не забывай посещать город :)',
  },
  userStore: {
    titleText: 'Промокодов нет',
  },
};

const EmptyPromoCode = ({ titleText, text }: IEmptyPromoCodeTexts) => (
  <EmptyPromoCodeWrapper haveTwoRows={!!text}>
    <Icon type={TypeOfIcons.EMPTY_PROMO} style={styledConfig.icon} />
    <span className={EmptyPromoCodeClassNames.TITLE}>{titleText}</span>
    {text && <span className={EmptyPromoCodeClassNames.TEXT}>{text}</span>}
  </EmptyPromoCodeWrapper>
);

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
      {MTSCatalog.length ? (
        MTSCatalog.map((mtsItem, ind) => (
          <MTSItemCard key={ind} catalogItem={mtsItem} />
        ))
      ) : (
        <EmptyPromoCode {...emptyPromoCodesText.mtsShop} />
      )}
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
      {userPromocodesArray.length ? (
        userPromocodesArray.map((userPromocode, ind) => (
          <MTSItemCard key={ind} catalogItem={userPromocode} />
        ))
      ) : (
        <EmptyPromoCode {...emptyPromoCodesText.userStore} />
      )}
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

interface IEmptyPromoCodeTexts {
  titleText: string;
  text?: string;
}

interface IEmptyPromoCodeWrapper {
  haveTwoRows: boolean;
}

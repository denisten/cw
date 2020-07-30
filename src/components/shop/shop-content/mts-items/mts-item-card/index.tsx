import React from 'react';
import styled from 'styled-components';
import { Icon } from '../../../../../UI/icons';
import {
  ICatalogItems,
  UserMarketStore,
  TranslatedStoreItem,
} from '../../../../../effector/coupons/store';
import { useStore } from 'effector-react';
import { selectStoreItem } from '../../../../../effector/coupons/events';
import { StyledSpan } from '../../../../../UI/span';
import { MTSSans } from '../../../../../fonts';
import { MoneyCounter } from '../../money-counter';

const MTSCardBody = styled.div<{ active?: boolean }>`
  width: 100%;
  height: 56px;
  background: #ffffff;
  border: ${props =>
    props.active ? '2px solid #EB0E0E' : '1px solid #dedede'};
  box-sizing: border-box;
  border-radius: 10px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin-bottom: 12px;
`;

const Title = styled(StyledSpan)`
  font-family: ${MTSSans.BOLD};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.6px;
  color: #212527;
  margin-left: 16px;
`;

const PromoBubble = styled.div`
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.6px;
  color: #001424;
  box-sizing: border-box;
  padding: 0 15px;
  background: #ebebeb;
  border-radius: 10px;
  margin-right: 20px;
`;

const styledConfig = {
  icon: {
    width: '30px',
    height: '28px',
  },
};

export const MTSItemCard: React.FC<IMTSItemCard> = ({ catalogItem }) => {
  const { selectedStoreItem } = useStore(UserMarketStore);
  const checkActiveElem = selectedStoreItem?.slug === catalogItem.slug;
  return (
    <MTSCardBody
      onClick={() => selectStoreItem(catalogItem)}
      active={checkActiveElem}
    >
      <>
        <Icon style={styledConfig.icon} type={catalogItem.slug} />
        <Title>{catalogItem.name}</Title>
      </>
      <>
        <PromoBubble>{TranslatedStoreItem[catalogItem.type.slug]}</PromoBubble>
        <MoneyCounter sum={String(catalogItem.price)} />
      </>
    </MTSCardBody>
  );
};

interface IMTSItemCard {
  catalogItem: ICatalogItems;
}

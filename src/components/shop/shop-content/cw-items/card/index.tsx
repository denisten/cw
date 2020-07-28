import React from 'react';
import styled from 'styled-components';
import {
  ICatalogItems,
  UserMarketStore,
} from '../../../../../effector/coupons/store';
import { Icon } from '../../../../../UI/icons';
import { MTSSans } from '../../../../../fonts';
import { StyledSpan } from '../../../../../UI/span';
import { MoneyCounter } from '../../money-counter';
import { selectStoreItem } from '../../../../../effector/coupons/events';
import { useStore } from 'effector-react';

const CardWrapper = styled.div<{ active: boolean }>`
  width: 200px;
  height: 160px;
  background: #ffffff;
  border: ${props =>
    props.active ? '3px solid #0CB4D0' : '1px solid rgba(0, 0, 0, 0.1)'};
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 28px 0;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
  transition: border 0.1s;
`;
const TitleElem = styled(StyledSpan)`
  font-family: ${MTSSans.BOLD};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.6px;
  color: #212527;
  margin-top: 13px;
`;

const styledConfig = {
  icon: {
    width: '55px',
    height: '52px',
  },
};

export const Card: React.FC<{ catalogItem: ICatalogItems }> = ({
  catalogItem,
}) => {
  const { selectedStoreItem } = useStore(UserMarketStore);
  const checkActiveElem = selectedStoreItem?.slug === catalogItem.slug;
  return (
    <CardWrapper
      onClick={() => selectStoreItem(catalogItem)}
      active={checkActiveElem}
    >
      <Icon style={styledConfig.icon} type={catalogItem.slug} />
      <TitleElem>{catalogItem.name.replace(/Купон/gi, '')}</TitleElem>
      <MoneyCounter sum={String(catalogItem.price)} />
    </CardWrapper>
  );
};

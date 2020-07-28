import React from 'react';
import styled from 'styled-components';
import { ICatalogItems } from '../../../../../effector/coupons/store';
import { Icon } from '../../../../../UI/icons';
import { MTSSans } from '../../../../../fonts';
import { StyledSpan } from '../../../../../UI/span';
import { MoneyCounter } from '../../money-counter';

const CardWrapper = styled.div`
  width: 200px;
  height: 160px;
  background: #ffffff;
  border: 1px solid #dedede;
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 28px 0;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
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
  return (
    <CardWrapper>
      <Icon style={styledConfig.icon} type={catalogItem.slug} />
      <TitleElem>{catalogItem.name.replace(/Купон/gi, '')}</TitleElem>
      <MoneyCounter sum={String(catalogItem.price)} />
    </CardWrapper>
  );
};

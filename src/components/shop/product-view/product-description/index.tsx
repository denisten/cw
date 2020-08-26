import React from 'react';
import { ICatalogItems } from '../../../../effector/coupons/store';
import styled from 'styled-components';
import { StyledSpan } from '../../../../UI/span';
import { MTSSans } from '../../../../fonts';
import { MoneyCounter } from '../../shop-content/money-counter';

const TitleText = styled(StyledSpan)`
  font-family: ${MTSSans.BOLD};
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.6px;
  color: #212527;
  margin-bottom: 30px;
`;
const DescriptionText = styled(StyledSpan)`
  width: 225px;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.6px;
  color: #212527;
  opacity: 0.6;
  margin: 28px 0 44px 0;
`;

export const ProductDescription: React.FC<IProductDescription> = ({
  selectedStoreItem,
}) => {
  return (
    <>
      <TitleText>{selectedStoreItem?.name.replace(/Купон|"/gi, '')}</TitleText>
      <MoneyCounter
        sum={String(selectedStoreItem?.price)}
        additionText=" /шт."
      />
      <DescriptionText>
        {selectedStoreItem?.description || 'Описания нет'}
      </DescriptionText>
    </>
  );
};

interface IProductDescription {
  selectedStoreItem: ICatalogItems | null;
}

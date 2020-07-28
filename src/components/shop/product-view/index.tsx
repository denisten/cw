import React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { UserMarketStore } from '../../../effector/coupons/store';
import { StyledSpan } from '../../../UI/span';
import { MTSSans } from '../../../fonts';
import { MoneyCounter } from '../shop-content/money-counter';
import { Icon } from '../../../UI/icons';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const EmptyProductText = styled(StyledSpan)`
  font-weight: 900;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.6px;
  color: #c6c6c6;
`;

const ProductBuyWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px 15px 70px 30px;
  box-sizing: border-box;
`;

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

const styledConfig = {
  icon: {
    width: '55px',
    height: '52px',
  },
};

export const ProductView = () => {
  const { selectedStoreItem } = useStore(UserMarketStore);

  return (
    <Wrapper>
      {selectedStoreItem ? (
        <ProductBuyWrapper>
          <TitleText>{selectedStoreItem.name.replace('Купон', '')}</TitleText>

          <MoneyCounter
            sum={String(selectedStoreItem.price)}
            additionText=" /шт."
          />
          <DescriptionText>
            {selectedStoreItem.description || 'Описания нет'}
          </DescriptionText>
          <Icon style={styledConfig.icon} type={selectedStoreItem.slug} />
        </ProductBuyWrapper>
      ) : (
        <EmptyProductText>Выберите товар</EmptyProductText>
      )}
    </Wrapper>
  );
};

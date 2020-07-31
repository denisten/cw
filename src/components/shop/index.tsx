import React from 'react';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { Overlay } from '../../UI/overlay';
import styled from 'styled-components';

import { openMarket } from '../../effector/coupons/events';

import { ExitButton } from '../../UI/exit-button';
import { useStore } from 'effector-react';
import { UserMarketStore } from '../../effector/coupons/store';
import { useFetchShopCatalog } from '../../hooks/use-fetch-shop-catalog';

import ShopContent from './shop-content';
import ProductView from './product-view';
import background from './background.svg';

const styledConfig = {
  overlay: {
    zIndex: ZIndexes.MODAL,
  },
  exitButton: {
    top: '-1%',
    right: '-4%',
    hoverFlag: true,
    zIndex: ZIndexes.UI_BUTTON,
    displayFlag: true,
  },
};

const Wrapper = styled.div`
  width: 950px;
  height: 535px;
  display: grid;
  grid-template-columns: 632px 1fr;
  background-image: url(${background});
  position: relative;
  background-size: 100%;
  background-repeat: no-repeat;
`;

const Shop = () => {
  const { openedMarket, catalog } = useStore(UserMarketStore);
  useFetchShopCatalog(openedMarket, catalog);

  return (
    <Overlay displayFlag={openedMarket} {...styledConfig.overlay}>
      <Wrapper>
        <ExitButton
          {...styledConfig.exitButton}
          callBack={() => openMarket(false)}
        />
        <ShopContent />
        <ProductView />
      </Wrapper>
    </Overlay>
  );
};

export default Shop;

import React, { useEffect, lazy, Suspense } from 'react';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { Overlay } from '../../UI/overlay';
import styled from 'styled-components';

import { fetchShopCatalog, openMarket } from '../../effector/coupons/events';

import { ExitButton } from '../../UI/exit-button';
import { useStore } from 'effector-react';
import { UserMarketStore } from '../../effector/coupons/store';

const ShopContent = lazy(() => import('./shop-content'));
const ProductView = lazy(() => import('./product-view'));

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
  width: 920px;
  height: 535px;
  display: grid;
  grid-template-columns: 632px 1fr;
  background-color: white;
  position: relative;
`;

const Shop: React.FC = () => {
  const { openedMarket, catalog } = useStore(UserMarketStore);
  useEffect(() => {
    openedMarket && catalog.length === 0 && fetchShopCatalog('');
  }, [openedMarket]);

  return (
    <Overlay displayFlag={openedMarket} {...styledConfig.overlay}>
      <Wrapper>
        <ExitButton
          {...styledConfig.exitButton}
          callBack={() => openMarket(false)}
        />
        <Suspense fallback={<></>}>
          {openedMarket && (
            <>
              <ShopContent />
              <ProductView />
            </>
          )}
        </Suspense>
      </Wrapper>
    </Overlay>
  );
};

export default Shop;

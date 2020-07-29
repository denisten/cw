import React, { useEffect } from 'react';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { Overlay } from '../../UI/overlay';
import styled from 'styled-components';
import { ShopContent } from './shop-content';

import { fetchShopCatalog } from '../../effector/coupons/events';
import { ProductView } from './product-view';
import { ExitButton } from '../../UI/exit-button';

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
  useEffect(() => {
    fetchShopCatalog('');
  }, []);

  return (
    <Overlay displayFlag={true} {...styledConfig.overlay}>
      <Wrapper>
        <ExitButton {...styledConfig.exitButton} />
        <ShopContent />
        <ProductView />
      </Wrapper>
    </Overlay>
  );
};

export default Shop;

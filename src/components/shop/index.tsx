import React, { useEffect } from 'react';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { Overlay } from '../../UI/overlay';
import styled from 'styled-components';
import { ShopContent } from './shop-content';

import { fetchShopCatalog } from '../../effector/coupons/events';
import { ProductView } from './product-view';

const StyledConfig = {
  overlay: {
    zIndex: ZIndexes.MODAL,
  },
};

const Wrapper = styled.div`
  width: 920px;
  height: 535px;
  display: grid;
  grid-template-columns: 632px 1fr;
  background-color: white;
`;

const Shop: React.FC = () => {
  useEffect(() => {
    fetchShopCatalog('');
  }, []);

  return (
    <Overlay displayFlag={true} {...StyledConfig.overlay}>
      <Wrapper>
        <ShopContent />
        <ProductView />
      </Wrapper>
    </Overlay>
  );
};

export default Shop;

import React from 'react';
import headerBg from './headerBg.svg';
import { ShopItemsHeader } from '../shop-items-header';
export const MtsItems = () => {
  return (
    <div>
      <ShopItemsHeader headerText="МТС" background={headerBg} />
    </div>
  );
};

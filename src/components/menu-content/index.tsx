import React from 'react';
import { MenuItems } from '../../UI/menu-paragraph';
import { Profile } from '../profile';
import styled from 'styled-components';
import { Settings } from '../settings';
import { ZIndexes } from '../root-component/z-indexes-enum';

const MenuContentWrapper = styled.div`
  flex: 1;
  background: #fff;
  width: 776px;
  height: 100%;
  z-index: ${ZIndexes.UI_BUTTON};
`;

type MenuContentProps = {
  content: MenuItems;
};

const MenuContentSelector: React.FC<MenuContentProps> = ({ content }) => {
  switch (content) {
    case MenuItems.PROFILE:
      return <Profile />;
    case MenuItems.OFFER:
      return <h1>Offer</h1>;
    case MenuItems.SETTINGS:
      return <Settings />;
    default:
      return <h1>In Progress...</h1>;
  }
};

export const MenuContent: React.FC<MenuContentProps> = ({ content }) => {
  return (
    <MenuContentWrapper>
      <MenuContentSelector content={content} />
    </MenuContentWrapper>
  );
};

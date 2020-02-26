import React from 'react';
import { MenuItems } from '../../UI/menu-paragraph';
import { Profile } from '../profile';
import styled from 'styled-components';
import { Settings } from '../settings';

const MenuContentWrapper = styled.div`
  width: 66%;
  height: 74%;
  position: absolute;
  top: 10%;
  right: 6%;
`;

type MenuContentProps = {
  content: MenuItems;
};

const MenuContentSelector: React.FC<MenuContentProps> = ({ content }) => {
  switch (content) {
    case MenuItems.PROFILE:
      return <Profile />;
    case MenuItems.DOCUMENTS:
      return <h1>Documents</h1>;
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

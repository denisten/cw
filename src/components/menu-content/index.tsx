import React from 'react';
import { MenuItems } from '../../UI/menu-paragraph';
import { Profile } from '../profile';
import styled from 'styled-components';
import { Settings } from '../settings';
import menuContentBackground from './background.png';


const MenuContentWrapper = styled.div`
  flex: 1;
  background: url(${menuContentBackground}) no-repeat center;
  background-size: 100% 100%;
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

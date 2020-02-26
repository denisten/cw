import React from 'react';
import { MenuItems } from '../../UI/menu-paragraph';
import { Profile } from '../profile';
import styled from 'styled-components';
import { Settings } from '../settings';


const MenuContentWrapper = styled.div`
  flex: 1;
  background-color: white;
  clip-path: polygon(30% 0%, 70% 0%, 100% 0, 100% 90%, 90% 100%, 30% 100%, 0 100%, 0 0);
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

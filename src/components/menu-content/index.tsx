import React from 'react';
import { MenuItems } from '../../UI/menu-paragraph';
import { Profile } from '../profile';
import styled from 'styled-components';

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

export const MenuContent: React.FC<MenuContentProps> = ({ content }) => {
  let ContentComponent;
  switch (content) {
    case MenuItems.PROFILE:
      ContentComponent = <Profile />;
      break;
    case MenuItems.DOCUMENTS:
      ContentComponent = <h1>Documents</h1>;
      break;
    default:
      ContentComponent = <h1> In progress... </h1>;
      break;
  }
  return <MenuContentWrapper>{ContentComponent}</MenuContentWrapper>;
};

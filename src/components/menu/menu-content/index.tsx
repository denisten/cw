import React from 'react';
import { Profile } from '../profile';
import styled from 'styled-components';
import { Feedback } from '../feedback';
import { Faq } from '../faq';
import { Offer } from '../offer';
import { ZIndexes } from '../../root-component/z-indexes-enum';
import { DevTools } from '../../dev-tools';
import { MenuItems } from '../../../UI/menu-paragraph';
import { Settings } from '../../settings';
import { Tasks } from '../../tasks';

const MenuContentWrapper = styled.div<{ activeTaskElem: boolean }>`
  flex: 1;
  background: ${props => (props.activeTaskElem ? 'inherit' : '#fff')};
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
      return <Offer />;
    case MenuItems.SETTINGS:
      return <Settings />;
    case MenuItems.TASKS:
      return <Tasks />;
    case MenuItems.DEV:
      return <DevTools />;
    case MenuItems.FEEDBACK:
      return <Feedback />;
    case MenuItems.QA:
      return <Faq />;
    default:
      return <h1>In Progress...</h1>;
  }
};

export const MenuContent: React.FC<MenuContentProps> = ({ content }) => {
  return (
    <MenuContentWrapper activeTaskElem={content === MenuItems.TASKS}>
      <MenuContentSelector content={content} />
    </MenuContentWrapper>
  );
};

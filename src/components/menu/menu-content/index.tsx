import React from 'react';
import { Profile } from '../menu-profile';
import styled from 'styled-components';
import { ZIndexes } from '../../root-component/z-indexes-enum';
import { DevTools } from '../../dev-tools';
import { MenuItems } from '../../../UI/menu-paragraph';
import { Settings } from '../../settings';
import { MenuTasks } from '../menu-tasks';
import { MenuHelp } from '../menu-help';
import { MenuInfo } from '../menu-info';
import background from './background.svg';
const MenuContentWrapper = styled.div`
  flex: 1;
  background: url(${background}) no-repeat center, white;
  background-size: 100% 100%;
  width: 776px;
  height: 100%;
  z-index: ${ZIndexes.UI_BUTTON};
`;

const MenuContentSelector: React.FC<IMenuContent> = ({ content }) => {
  switch (content) {
    case MenuItems.PROFILE:
      return <Profile />;
    case MenuItems.TASKS:
      return <MenuTasks />;
    case MenuItems.HELP:
      return <MenuHelp />;
    case MenuItems.SETTINGS:
      return <Settings />;
    case MenuItems.INFO:
      return <MenuInfo />;
    case MenuItems.DEV:
      return <DevTools />;
    default:
      return <h1>In Progress...</h1>;
  }
};

export const MenuContent: React.FC<IMenuContent> = ({ content }) => {
  return (
    <MenuContentWrapper>
      <MenuContentSelector content={content} />
    </MenuContentWrapper>
  );
};

interface IMenuContent {
  content: MenuItems;
}

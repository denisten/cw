import React from 'react';
import { Profile } from '../menu-profile';
import styled from 'styled-components';
import { ZIndexes } from '../../root-component/z-indexes-enum';
import { DevTools } from '../../dev-tools';
import { MenuItems } from '../../../UI/menu-paragraph';
import { Settings } from '../../settings';
import { MenuTasks } from '../menu-tasks';
import { MenuHelp } from '../menu-help';
import { MenuInstruction } from '../menu-instruction';

const MenuContentWrapper = styled.div<IMenuContentWrapper>`
  flex: 1;
  background: ${props => (props.activeTaskElem ? 'inherit' : '#fff')};
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
    case MenuItems.INSTRUCTION:
      return <MenuInstruction />;
    case MenuItems.OTHERS:
      return <Settings />;
    case MenuItems.DEV:
      return <DevTools />;
    default:
      return <h1>In Progress...</h1>;
  }
};

export const MenuContent: React.FC<IMenuContent> = ({ content }) => {
  return (
    <MenuContentWrapper activeTaskElem={content === MenuItems.TASKS}>
      <MenuContentSelector content={content} />
    </MenuContentWrapper>
  );
};

interface IMenuContentWrapper {
  activeTaskElem: boolean;
}

interface IMenuContent {
  content: MenuItems;
}

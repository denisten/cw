import React from 'react';
import styled from 'styled-components';

type MenuParagraphWrapperProps = {
  content: string;
  selected: boolean;
};

export enum MenuItems {
  PROFILE = 'profile',
  TASKS = 'tasks',
  SETTINGS = 'settings',
  FEEDBACK = 'feedback',
  DOCUMENTS = 'documents',
}

const TranslatedMenuItems = {
  [MenuItems.PROFILE]: 'Профиль',
  [MenuItems.TASKS]: 'Задания',
  [MenuItems.SETTINGS]: 'Настройки',
  [MenuItems.FEEDBACK]: 'Обратная связь',
  [MenuItems.DOCUMENTS]: 'Документы и оферта',
};

const MenuParagraphWrapper = styled.span<MenuParagraphWrapperProps>`
  height: 15%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 2em;
  color: #1b4f75;
  font-weight: ${props => (props.selected ? 'bold' : 'normal')};
  p {
    &:hover {
      cursor: pointer;
    }
  }
`;

type MenuParagraphProps = {
  menuElement: MenuItems;
  selectedMenuItem: MenuItems;
  onClickHandler: () => void;
};

export const MenuParagraph: React.FC<MenuParagraphProps> = ({
  menuElement,
  selectedMenuItem,
  onClickHandler,
}) => {
  return (
    <MenuParagraphWrapper
      content={menuElement}
      selected={selectedMenuItem === menuElement}
    >
      <p onClick={onClickHandler}> {TranslatedMenuItems[menuElement]} </p>
    </MenuParagraphWrapper>
  );
};

import React from 'react';
import styled from 'styled-components';

type MenuParagraphWrapperProps = {
  content: string;
  isItemSelected: boolean;
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
  color: #${props => (props.isItemSelected ? '1b4f75' : '3e6f93')};
  font-weight: ${props => (props.isItemSelected ? 'bold' : 'normal')};
  p {
    &:hover {
      cursor: pointer;
    }
  }
`;

const MenuParagraphTitleWrapper = styled.span`
  cursor: pointer;
`;

type MenuParagraphProps = {
  menuElement: MenuItems;
  isItemSelected: boolean;
  onClickHandler: () => void;
};

export const MenuParagraph: React.FC<MenuParagraphProps> = ({
  menuElement,
  isItemSelected,
  onClickHandler,
}) => {
  return (
    <MenuParagraphWrapper content={menuElement} isItemSelected={isItemSelected}>
      <MenuParagraphTitleWrapper onClick={onClickHandler}>
        {TranslatedMenuItems[menuElement]}
      </MenuParagraphTitleWrapper>
    </MenuParagraphWrapper>
  );
};

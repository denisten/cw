import React from 'react';
import styled from 'styled-components';
import notifyMin from '../../img/notify-icons/notify.png';

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

const MenuParagraphWrapper = styled.div<MenuParagraphWrapperProps>`
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 30.5px;
  color: #${props => (props.isItemSelected ? 'ffffff' : '9fa9b0')};
  font-weight: ${props => (props.isItemSelected ? 'bold' : 'normal')};
  background-color: ${props => (props.isItemSelected ? '#768c9b' : 'none')};
  padding-left: 80px;
  box-sizing: border-box;

  p {
    &:hover {
      cursor: pointer;
    }
  }
`;
const Notify = styled.div `
    margin-left: 13px;
    width: 23px;
    height: 32px;
    background: url(${notifyMin}) no-repeat center;
    background-size: 100% 100%;
    flex-shrink: 0;
`


const MenuParagraphTitleWrapper = styled.div`
  cursor: pointer;
`;

type MenuParagraphProps = {
  menuElement: MenuItems;
  isItemSelected: boolean;
  onClickHandler: () => void;
  haveNotify: boolean;
};

export const MenuNavigationElement: React.FC<MenuParagraphProps> = ({
  menuElement,
  isItemSelected,
  onClickHandler,
  haveNotify
}) => {
  return (
    <MenuParagraphWrapper content={menuElement} isItemSelected={isItemSelected}>
      <MenuParagraphTitleWrapper onClick={onClickHandler}>
        {TranslatedMenuItems[menuElement]}
      </MenuParagraphTitleWrapper>
      {haveNotify ? <Notify/> : null}
    </MenuParagraphWrapper>
  );
};

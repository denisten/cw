import React from 'react';
import styled from 'styled-components';
import notifyIcon from '../../img/notify-icons/notify.png';
import { myFunc } from '../button';

type MenuParagraphWrapperProps = {
  menuElement: MenuItems;
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
const Notify = styled.div`
  margin-left: 13px;
  width: 23px;
  height: 32px;
  background: url(${notifyIcon}) no-repeat center;
  background-size: 100% 100%;
  flex-shrink: 0;
`;

const MenuParagraphTitleWrapper = styled.div<{
  pulseAnim: boolean;
}>`
  cursor: pointer;
  animation-name: ${props =>
    props.pulseAnim ? myFunc('159, 169, 176') : 'none'};
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 0.6s;
`;

interface MenuParagraphProps extends MenuParagraphWrapperProps {
  onClickHandler: () => void;
  haveNotify: boolean;
  pulseAnim: boolean;
}

export const MenuNavigationElement: React.FC<MenuParagraphProps> = ({
  menuElement,
  isItemSelected,
  onClickHandler,
  haveNotify,
  pulseAnim,
  ...props
}) => {
  return (
    <MenuParagraphWrapper
      menuElement={menuElement}
      isItemSelected={isItemSelected}
      {...props}
    >
      <MenuParagraphTitleWrapper onClick={onClickHandler} pulseAnim={pulseAnim}>
        {TranslatedMenuItems[menuElement]}
      </MenuParagraphTitleWrapper>
      {haveNotify ? <Notify /> : null}
    </MenuParagraphWrapper>
  );
};

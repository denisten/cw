import React from 'react';
import styled from 'styled-components';
import notifyIcon from '../../img/notify-icons/notify.png';
import { pulseAnimationHOF } from '../../hoc/pulse-anim';
import { MTSSans } from '../../fonts';

export enum MenuItems {
  PROFILE = 'kabinet',
  TASKS = 'zadaniya',
  HELP = 'pomosch',
  INFO = 'chto_novogo',
  SETTINGS = 'nastroiki',
  DEV = 'instrumenty_razrabotki',
}

const TranslatedMenuItems = {
  [MenuItems.PROFILE]: 'Кабинет',
  [MenuItems.TASKS]: 'Задания',
  [MenuItems.HELP]: 'Помощь',
  [MenuItems.INFO]: 'Что нового?',
  [MenuItems.SETTINGS]: 'Настройки',
  [MenuItems.DEV]: 'Инструменты разработки',
};

const notSelectedItemFontWeight = 500;

const MenuParagraphWrapper = styled.div<IMenuParagraphWrapper>`
  height: 56px;
  width: 100%;
  display: ${props => (props.hidden ? 'none' : 'flex')};
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
  color: #fff;
  font-family: ${props =>
    props.isItemSelected ? MTSSans.MEDIUM : MTSSans.REGULAR};
  font-weight: ${props =>
    props.isItemSelected ? notSelectedItemFontWeight : 'normal'};
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: -0.5px;
  background-color: ${props =>
    props.isItemSelected ? 'rgba(255, 255, 255, 0.15)' : 'none'};
  padding-left: 48px;
  box-sizing: border-box;
  pointer-events: auto;
`;

const Notify = styled.div`
  margin-left: 13px;
  width: 23px;
  height: 32px;
  background: url(${notifyIcon}) no-repeat center;
  background-size: 100% 100%;
  flex-shrink: 0;
`;

const MenuParagraphTitleWrapper = styled.div<IMenuParagraphTitleWrapper>`
  cursor: pointer;
  animation-name: ${props =>
    props.pulseAnim ? pulseAnimationHOF('159, 169, 176') : 'none'};
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 1s;
  padding: 5px 10px;
`;

export const MenuNavigationElement: React.FC<IMenuParagraph> = ({
  menuElement,
  isItemSelected,
  onClickHandler,
  haveNotify,
  pulseAnim = false,
  hidden,
  ...props
}) => {
  const notifications = haveNotify ? <Notify /> : null;

  return (
    <MenuParagraphWrapper
      menuElement={menuElement}
      isItemSelected={isItemSelected}
      {...props}
      hidden={hidden}
    >
      <MenuParagraphTitleWrapper pulseAnim={pulseAnim} onClick={onClickHandler}>
        {TranslatedMenuItems[menuElement]}
      </MenuParagraphTitleWrapper>
      {notifications}
    </MenuParagraphWrapper>
  );
};

interface IMenuParagraphTitleWrapper {
  pulseAnim?: boolean;
}

interface IMenuParagraphWrapper {
  menuElement: MenuItems;
  isItemSelected: boolean;
}

interface IMenuParagraph extends IMenuParagraphWrapper {
  onClickHandler: () => void;
  haveNotify: boolean;
  pulseAnim?: boolean;
  hidden?: boolean;
}

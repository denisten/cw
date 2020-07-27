import React from 'react';
import styled from 'styled-components';
import notifyIcon from '../../img/notify-icons/notify.png';
import { pulseAnimationHOF } from '../../hoc/pulse-anim';
import { MTSSans } from '../../fonts';

export enum MenuItems {
  PROFILE = 'profile',
  TASKS = 'tasks',
  OTHERS = 'others',
  INSTRUCTION = 'instruction',
  HELP = 'help',
  FEEDBACK = 'feedback',
  OFFER = 'offer',
  QA = 'qa',
  DEV = 'dev',
}

const TranslatedMenuItems = {
  [MenuItems.PROFILE]: 'Кабинет',
  [MenuItems.TASKS]: 'Задания',
  [MenuItems.HELP]: 'Помощь',
  [MenuItems.INSTRUCTION]: 'Инструкция',
  [MenuItems.OTHERS]: 'Прочее',
  [MenuItems.DEV]: 'Инструменты разработки',
  [MenuItems.FEEDBACK]: 'Обратная связь',
  [MenuItems.OFFER]: 'Оферта',
  [MenuItems.QA]: 'Вопросы и ответы',
};

const notSelectedItemFontWeight = 500;
const notAvailableOpacity = 0.5;

const MenuParagraphWrapper = styled.div<IMenuParagraphWrapper>`
  height: 56px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
  color: #fff;
  opacity: ${props => (props.isAvailable ? 1 : notAvailableOpacity)};
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
  cursor: ${props => (props.isAvailable ? 'pointer' : 'default')};
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
  isAvailable,
  ...props
}) => {
  const notifications = haveNotify ? <Notify /> : null;

  return (
    <MenuParagraphWrapper
      menuElement={menuElement}
      isItemSelected={isItemSelected}
      isAvailable={isAvailable}
      {...props}
    >
      <MenuParagraphTitleWrapper
        pulseAnim={pulseAnim}
        onClick={onClickHandler}
        isAvailable={isAvailable}
      >
        {TranslatedMenuItems[menuElement]}
      </MenuParagraphTitleWrapper>
      {notifications}
    </MenuParagraphWrapper>
  );
};

interface IMenuParagraphTitleWrapper {
  pulseAnim?: boolean;
  isAvailable: boolean;
}

interface IMenuParagraphWrapper {
  menuElement: MenuItems;
  isItemSelected: boolean;
  isAvailable: boolean;
}

interface IMenuParagraph extends IMenuParagraphWrapper {
  onClickHandler: () => void;
  haveNotify: boolean;
  pulseAnim?: boolean;
}

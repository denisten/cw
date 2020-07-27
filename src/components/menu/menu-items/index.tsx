import React from 'react';
import styled from 'styled-components';
import background from './background.svg';
import { MenuItems, MenuNavigationElement } from '../../../UI/menu-paragraph';
import { checkHaveNotify } from '../../../utils/check-have-notify';

const MenuWrapper = styled.div`
  width: 274px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: url(${background}) no-repeat center;
  background-size: cover;
  flex-shrink: 0;
  position: relative;
  padding-top: 42px;
  box-sizing: border-box;
  overflow: hidden;
  user-select: none;
`;

export const noAuthAvailableMenuItems = [
  MenuItems.PROFILE,
  MenuItems.SETTINGS,
  MenuItems.TASKS,
  MenuItems.DEV,
];

const allMenuItems = [
  MenuItems.PROFILE,
  MenuItems.SETTINGS,
  MenuItems.TASKS,
  MenuItems.FEEDBACK,
  MenuItems.HELP,
  MenuItems.QA,
  MenuItems.DEV,
];

export const MenuItemsComponent: React.FC<IMenuItemsComponent> = ({
  selectedMenuItem,
  callBack,
  currentAlertsList,
  isAuthorized,
}) => {
  return (
    <MenuWrapper>
      {allMenuItems.map(el => {
        return (
          <MenuNavigationElement
            isAvailable={isAuthorized || noAuthAvailableMenuItems.includes(el)}
            key={el}
            menuElement={el}
            isItemSelected={selectedMenuItem === el}
            haveNotify={checkHaveNotify(currentAlertsList, el)}
            onClickHandler={() => callBack(el)}
          />
        );
      })}
    </MenuWrapper>
  );
};

interface IMenuItemsComponent {
  isAuthorized: boolean;
  selectedMenuItem: MenuItems;
  callBack: (props: MenuItems) => void;
  currentAlertsList: Array<string>;
}

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
  background-size: 100% 100%;
  flex-shrink: 0;
  position: relative;
  padding-top: 42px;
  box-sizing: border-box;
  overflow: hidden;
  user-select: none;
  left: 2px;
`;

const allMenuItems = [
  MenuItems.PROFILE,
  MenuItems.TASKS,
  MenuItems.HELP,
  MenuItems.INFO,
  MenuItems.SETTINGS,
  MenuItems.DEV,
];

export const MenuItemsComponent: React.FC<IMenuItemsComponent> = ({
  selectedMenuItem,
  callBack,
  currentAlertsList,
}) => {
  const haveDevFlag = window.location.host.includes('dev');
  return (
    <MenuWrapper>
      {allMenuItems.map(el => {
        return (
          <MenuNavigationElement
            key={el}
            menuElement={el}
            isItemSelected={selectedMenuItem === el}
            haveNotify={checkHaveNotify(currentAlertsList, el)}
            onClickHandler={() => callBack(el)}
            hidden={el === MenuItems.DEV && !haveDevFlag}
          />
        );
      })}
    </MenuWrapper>
  );
};

interface IMenuItemsComponent {
  selectedMenuItem: MenuItems;
  callBack: (props: MenuItems) => void;
  currentAlertsList: Array<string>;
}

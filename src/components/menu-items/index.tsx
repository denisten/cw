import React from 'react';
import styled from 'styled-components';
import { MenuItems, MenuNavigationElement } from '../../UI/menu-paragraph';
import background from './background.svg';
import { checkHaveNotify } from '../../utils/check-have-notify';

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
`;

type MenuItemsComponentProps = {
  selectedMenuItem: MenuItems;
  callBack: (props: MenuItems) => void;
  currentNotifysList: Array<string>;
};

export const MenuItemsComponent: React.FC<MenuItemsComponentProps> = ({
  selectedMenuItem,
  callBack,
  currentNotifysList,
}) => {
  const MenuItemsObjectValues = Object.values(MenuItems) as MenuItems[];

  return (
    <MenuWrapper>
      {MenuItemsObjectValues.map(el => {
        return (
          <MenuNavigationElement
            key={el}
            menuElement={el}
            isItemSelected={selectedMenuItem === el}
            haveNotify={checkHaveNotify(currentNotifysList, el)}
            onClickHandler={() => callBack(el)}
          />
        );
      })}
    </MenuWrapper>
  );
};

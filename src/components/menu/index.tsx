import React from 'react';
import styled from 'styled-components';
import { MenuItems, MenuNavigationElement } from '../../UI/menu-paragraph';
import background from './background.png';

const MenuWrapper = styled.div`
  width: 406px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: url(${background}) no-repeat center;
  background-size: 100% 100%;
  flex-shrink: 0;
`;

type MenuItemsComponentProps = {
  selectedMenuItem: MenuItems;
  callBack: (props: MenuItems) => void;
};

export const MenuItemsComponent: React.FC<MenuItemsComponentProps> = ({
  selectedMenuItem,
  callBack,
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
            onClickHandler={() => callBack(el)}
          />
        );
      })}
    </MenuWrapper>
  );
};

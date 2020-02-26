import React from 'react';
import styled from 'styled-components';
import { MenuItems, MenuNavigationElement } from '../../UI/menu-paragraph';

const MenuWrapper = styled.div`
  width: 20%;
  height: 60%;
  position: absolute;
  left: 5%;
  top: 7%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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

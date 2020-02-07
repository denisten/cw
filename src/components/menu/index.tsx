import React from 'react';
import styled from 'styled-components';
import { MenuItems, MenuParagraph } from '../../UI/menu-paragraph';

const MenuWrapper = styled.div`
  width: 20%;
  height: 83%;
  position: absolute;
  left: 5%;
  top: 7%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

type MenuItemsComponentProps = {
  selectedMenuItem: MenuItems;
  setSelectedMenuItem: (props: MenuItems) => void;
};

export const MenuItemsComponent: React.FC<MenuItemsComponentProps> = ({
  selectedMenuItem,
  setSelectedMenuItem,
}) => {
  const MenuItemsObjectValues = Object.values(MenuItems) as MenuItems[];
  return (
    <MenuWrapper>
      {MenuItemsObjectValues.map(el => {
        return (
          <MenuParagraph
            key={el}
            menuElement={el}
            selectedMenuItem={selectedMenuItem}
            onClickHandler={() => setSelectedMenuItem(el)}
          />
        );
      })}
    </MenuWrapper>
  );
};

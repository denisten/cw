import React, { useState } from 'react';
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
`;

export const Menu = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItems>(
    MenuItems.PROFILE
  );
  return (
    <MenuWrapper>
      <MenuParagraph
        menuElement={MenuItems.PROFILE}
        selectedMenuItem={selectedMenuItem}
        onClickHandler={() => setSelectedMenuItem(MenuItems.PROFILE)}
      />
      <MenuParagraph
        menuElement={MenuItems.TASKS}
        selectedMenuItem={selectedMenuItem}
        onClickHandler={() => setSelectedMenuItem(MenuItems.TASKS)}
      />
      <MenuParagraph
        menuElement={MenuItems.SETTINGS}
        selectedMenuItem={selectedMenuItem}
        onClickHandler={() => setSelectedMenuItem(MenuItems.SETTINGS)}
      />
      <MenuParagraph
        menuElement={MenuItems.FEEDBACK}
        selectedMenuItem={selectedMenuItem}
        onClickHandler={() => setSelectedMenuItem(MenuItems.FEEDBACK)}
      />
      <MenuParagraph
        menuElement={MenuItems.DOCUMENTS}
        selectedMenuItem={selectedMenuItem}
        onClickHandler={() => setSelectedMenuItem(MenuItems.DOCUMENTS)}
      />
    </MenuWrapper>
  );
};

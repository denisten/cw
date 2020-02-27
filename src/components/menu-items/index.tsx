import React from 'react';
import styled from 'styled-components';
import { MenuItems, MenuNavigationElement } from '../../UI/menu-paragraph';
import background from './background.png';
import profilerowBcg from './profileRowBcg.png';

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
  position: relative;
`;

const ProfileRow = styled.div `
position: absolute;
top: -43px;
left: 0;
width: 891px;
height: 123px;
background: url(${profilerowBcg}) no-repeat center;
background-size: 100% 100%;
z-index: 2;
`

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
            haveNotify = {currentNotifysList.findIndex(elem => elem === el) !== -1}
            onClickHandler={() => callBack(el)}
          />
        );
      })}
     <ProfileRow/>
    </MenuWrapper>
  );
};

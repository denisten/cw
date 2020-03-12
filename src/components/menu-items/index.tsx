import React from 'react';
import styled from 'styled-components';
import { MenuItems, MenuNavigationElement } from '../../UI/menu-paragraph';
import background from './background.png';
import { checkHaveNotify } from '../../utils/check-have-notify';
import { TutorialConditions } from '../../effector/tutorial-store/store';

const MenuWrapper = styled.div`
  width: 406px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: url(${background}) no-repeat center;
  background-size: cover;
  flex-shrink: 0;
  position: relative;
`;

type MenuItemsComponentProps = {
  selectedMenuItem: MenuItems;
  callBack: (props: MenuItems) => void;
  currentNotifysList: Array<string>;
  tutorialCondition: TutorialConditions;
};

export const MenuItemsComponent: React.FC<MenuItemsComponentProps> = ({
  selectedMenuItem,
  callBack,
  currentNotifysList,
  tutorialCondition,
}) => {
  const MenuItemsObjectValues = Object.values(MenuItems) as MenuItems[];
  return (
    <MenuWrapper>
      {MenuItemsObjectValues.map(el => {
        return (
          <MenuNavigationElement
            pulseAnim={
              el === MenuItems.SETTINGS &&
              tutorialCondition ===
                TutorialConditions.PULSE_SETTINGS_CHANGE_CITY_NAME
            }
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

import React from 'react';
import styled from 'styled-components';
import { MenuItems, MenuNavigationElement } from '../../UI/menu-paragraph';
import background from './background.svg';
import { checkHaveNotify } from '../../utils/check-have-notify';
import { TutorialConditions } from '../../effector/tutorial-store/store';

const MenuWrapper = styled.div`
  width: 290px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: url(${background}) no-repeat center;
  background-size: cover;
  flex-shrink: 0;
  position: relative;
  left: 14px;
  top: 2px;
  padding-top: 36px;
  box-sizing: border-box;
  overflow: hidden;
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

  const checkAvailableForClickElem = (elem: string) => {
    if (!tutorialCondition) return true;
    else if (
      elem === MenuItems.PROFILE &&
      (tutorialCondition === TutorialConditions.PULSE_EDIT_CHANGE_CITY_NAME ||
        tutorialCondition === TutorialConditions.PULSE_SAVE_CHANGE_CITY_NAME)
    ) {
      return true;
    } else if (
      elem === MenuItems.PROFILE &&
      tutorialCondition === TutorialConditions.PULSE_AUTH_BUTTON
    ) {
      return true;
    }
  };
  return (
    <MenuWrapper>
      {MenuItemsObjectValues.map(el => {
        return (
          <MenuNavigationElement
            key={el}
            availableForClick={checkAvailableForClickElem(el)}
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

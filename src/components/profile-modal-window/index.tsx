import React from 'react';
import { ExitButton } from '../../UI/exit-button';
import {
  nextTutorStep,
  menuClosed,
  menuOpened,
  turnOffTutorialMode,
} from '../../effector/app-condition/events';
import background from './background.png';
import { ImgWrapper } from '../../UI/img-wrapper';
import { SaveButton } from '../../UI/save-button';
import { MenuItemsComponent } from '../menu-items';
import { MenuContent } from '../menu-content';
import { MenuItems } from '../../UI/menu-paragraph';
import { useStore } from 'effector-react';
import {
  AppCondition,
  TutorialConditions,
} from '../../effector/app-condition/store';
import { Directions, TutorialArrow } from '../../UI/tutorial-arrow';
import { HeaderComponent } from '../header';
import { RowWrapper } from '../../UI/row-wrapper';
import { ColumnWrapper } from '../../UI/column-wrapper';

const StyledConfig = {
  exitButton: {
    height: '28px',
    top: 1,
    right: 1,
    hoverFlag: true,
  },
  mainWrapper: {
    height: '820px',
    zIndex: 20,
    position: 'absolute',
    top: 50,
    left: 50,
    transformTranslate: '-50%, -50%',
    width: '1250px'
  },
  avatar: {
    height: '13%',
    top: 4.7,
    left: 36.8,
  },
  saveButton: {
    height: '7%',
    bottom: 0,
    left: 50,
    transformTranslate: '-50%, -50%',
    hoverFlag: true,
  },
  tutorialArrow: {
    direction: Directions.LEFT,
    range: 2,
    top: 20,
    left: 20,
  },
  rowWrapper: {
    width: '100%',
    height: '100%'
  },
  header: {
    height: '85px'
  }
};

export const Menu = () => {
  const { tutorialCondition, selectedMenuItem } = useStore(AppCondition);
  const menuItemsComponentCallBack = (item: MenuItems) => {
    menuOpened(item);
    if (
      item === MenuItems.SETTINGS &&
      tutorialCondition === TutorialConditions.SETTINGS_ARROW
    )
      nextTutorStep();
  };
  const handleSaveButtonClick = () => {
    menuClosed();
    if (tutorialCondition === TutorialConditions.SAVE_CITY_NAME_ARROW)
      turnOffTutorialMode();
  };

  return (
    <ColumnWrapper {...StyledConfig.mainWrapper}>
      <HeaderComponent {...StyledConfig.header}>
      <ExitButton {...StyledConfig.exitButton} callBack={() => menuClosed()} />
      </HeaderComponent>
      <RowWrapper {...StyledConfig.rowWrapper}>
      <MenuItemsComponent
        currentNotifysList = {['tasks', 'feedback']} // TODO get real data from somewhere
        selectedMenuItem={selectedMenuItem || MenuItems.PROFILE}
        callBack={menuItemsComponentCallBack}
      />

      {tutorialCondition === TutorialConditions.SETTINGS_ARROW ? (
        <TutorialArrow {...StyledConfig.tutorialArrow} />
      ) : (
        <React.Fragment />
      )}
      <MenuContent content={selectedMenuItem || MenuItems.PROFILE} />
      </RowWrapper>
      {/* <MenuItemsComponent
        selectedMenuItem={selectedMenuItem || MenuItems.PROFILE}
        callBack={menuItemsComponentCallBack}
      />
      {tutorialCondition === TutorialConditions.SETTINGS_ARROW ? (
        <TutorialArrow {...StyledConfig.tutorialArrow} />
      ) : (
        <React.Fragment />
      )}
      <MenuContent content={selectedMenuItem || MenuItems.PROFILE} />
      <ExitButton {...StyledConfig.exitButton} callBack={() => menuClosed()} />
      <SaveButton
        {...StyledConfig.saveButton}
        callBack={handleSaveButtonClick}
      /> */}
    </ColumnWrapper>
  );
};

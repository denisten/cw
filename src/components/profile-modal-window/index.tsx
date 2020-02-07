import React, { useState } from 'react';
import { ExitButton } from '../../UI/exit-button';
import { profileInfoModalWindowClosed } from '../../effector/app-condition/events';
import background from './background.png';
import { ImgWrapper } from '../../UI/img-wrapper';
import { SaveButton } from '../../UI/save-button';
import { MenuItemsComponent } from '../menu';
import { MenuContent } from '../menu-content';
import { MenuItems } from '../../UI/menu-paragraph';

const StyledConfig = {
  exitButton: {
    height: '5%',
    top: 1,
    right: 1,
    hoverFlag: true,
  },
  mainWrapper: {
    height: '76.5%',
    zIndex: 20,
    position: 'absolute',
    top: 50,
    left: 50,
    transformTranslate: '-50%, -50%',
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
};

export const Menu = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItems>(
    MenuItems.PROFILE
  );
  return (
    <ImgWrapper {...StyledConfig.mainWrapper} src={background}>
      <MenuItemsComponent
        selectedMenuItem={selectedMenuItem}
        setSelectedMenuItem={item => setSelectedMenuItem(item)}
      />
      <MenuContent content={selectedMenuItem} />
      <ExitButton
        {...StyledConfig.exitButton}
        callBack={() => profileInfoModalWindowClosed()}
      />
      <SaveButton
        {...StyledConfig.saveButton}
        callBack={() => {
          profileInfoModalWindowClosed();
        }}
      />
    </ImgWrapper>
  );
};

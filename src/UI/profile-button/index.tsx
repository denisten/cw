import React from 'react';
import profileImg from './button_nickname.png';
import {
  menuOpened,
  extraTowerInfoModalClosed,
} from '../../effector/app-condition/events';
import { ImgWrapper } from '../img-wrapper';
import styled from 'styled-components';
import { MenuItems } from '../menu-paragraph';
import { NickName } from '../nickname';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';
import { AvatarWrapper } from '../avatar-wrapper';
import userAvatar from './profile-img.png';
import { MoneyWrapper } from '../money-wrapper';
import { TutorialConditions } from '../../effector/tutorial-store/store';
import { nextTutorStep } from '../../effector/tutorial-store/events';
import { UserDataStore } from '../../effector/user-data/store';
import { useStore } from 'effector-react';

const MoneyCounterWrapper = styled.div`
  position: absolute;
  top: 62%;
  left: 28%;
`;

const StyleConfig = {
  nickNameButton: {
    height: '8vh',
    width: '15vw',
    zIndex: ZIndexes.UI_BUTTON,
    top: 3.7,
    left: 3.2,
    hoverFlag: true,
  },

  avatar: {
    height: '100%',
    left: -5,
    top: -13,
    width: '35%',
  },

  money: {
    fontSize: '1.6vh',
    margin: '0 13px 0 20px',
  },
};

export const ProfileButton: React.FC<IProfileButton> = ({
  tutorialCondition,
  tutorialPause,
}) => {
  const handleClick = () => {
    if (!tutorialCondition || tutorialPause) {
      menuOpened(MenuItems.PROFILE);
      extraTowerInfoModalClosed();
      return;
    }
    if (
      tutorialCondition === TutorialConditions.PULSE_MENU_CHANGE_CITY_NAME ||
      tutorialCondition === TutorialConditions.PULSE_MENU_AUTH
    ) {
      menuOpened(MenuItems.PROFILE);
      extraTowerInfoModalClosed();
      nextTutorStep();
    }
  };
  const { money } = useStore(UserDataStore);
  return (
    <ImgWrapper
      src={profileImg}
      callBack={handleClick}
      animFlag={
        tutorialCondition === TutorialConditions.PULSE_MENU_CHANGE_CITY_NAME ||
        tutorialCondition === TutorialConditions.PULSE_MENU_AUTH
      }
      {...StyleConfig.nickNameButton}
    >
      <AvatarWrapper src={userAvatar} {...StyleConfig.avatar} />
      <NickName nickName="NickName" />
      <MoneyCounterWrapper>
        <MoneyWrapper count={money} {...StyleConfig.money} />
      </MoneyCounterWrapper>
    </ImgWrapper>
  );
};

interface IProfileButton {
  tutorialCondition: TutorialConditions;
  tutorialPause?: boolean;
}

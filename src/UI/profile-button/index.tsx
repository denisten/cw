import React from 'react';
import {
  menuOpened,
  extraTowerInfoModalClosed,
} from '../../effector/app-condition/events';
import styled from 'styled-components';
import { MenuItems } from '../menu-paragraph';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';
import { AvatarWrapper } from '../avatar-wrapper';
import userAvatar from './profile-img.png';
import { TutorialConditions } from '../../effector/tutorial-store/store';
import { nextTutorStep } from '../../effector/tutorial-store/events';
import { UserDataStore } from '../../effector/user-data/store';
import { useStore } from 'effector-react';
import nameBackground from './name-background.svg';
import coinsBackground from './coins-background.svg';
import coins from './coin.svg';
import { defaultScaleSize, scaleAnimation } from '../../hoc/scale-anim';

const CoinsWrapper = styled.div`
  background-image: url(${coinsBackground});
  background-size: 100%;
  width: 280px;
  height: 50px;
  position: relative;
  top: -11px;
  left: 3px;
  z-index: 1;
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #ffffff;
  padding: 16px 0 0 96px;
  box-sizing: border-box;
  display: flex;
`;

const NickNameWrapper = styled.div<INickNameWrapper>`
  background-image: url(${nameBackground});
  background-size: 100%;
  padding: 12px 0 0 20px;
  width: 312px;
  height: 61px;
  z-index: 2;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  font-family: "MTSSansBold"; 
  line-height: 1;
  letter-spacing: normal;
  color: #0290a7;
  box-sizing: border-box;
  &::after {
    content: "${props => props.content}";
  }
`;

const ProfileButtonWrapper = styled.div<IProfileButtonWrapper>`
  z-index: ${ZIndexes.UI_BUTTON};
  position: absolute;
  top: 37px;
  left: 39px;
  animation-name: ${props =>
    props.animFlag
      ? scaleAnimation(props.scaleSize || defaultScaleSize)
      : 'none'};
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 1s;
`;

const StyleConfig = {
  coins: {
    marginRight: '8px',
    position: 'relative',
    bottom: '4px',
  } as React.CSSProperties,
};

export const ProfileButton: React.FC<IProfileButton> = ({
  tutorialCondition,
}) => {
  const handleClick = () => {
    if (!tutorialCondition) {
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
    <ProfileButtonWrapper
      onClick={handleClick}
      animFlag={
        tutorialCondition === TutorialConditions.PULSE_MENU_CHANGE_CITY_NAME ||
        tutorialCondition === TutorialConditions.PULSE_MENU_AUTH
      }
    >
      <NickNameWrapper content="Nickname" />
      <CoinsWrapper>
        <img src={coins} alt="coins" style={StyleConfig.coins} />
        {money}
      </CoinsWrapper>
      <AvatarWrapper src={userAvatar} />
    </ProfileButtonWrapper>
  );
};

interface IProfileButton {
  tutorialCondition: TutorialConditions;
}

interface INickNameWrapper {
  content?: string;
}

interface IProfileButtonWrapper {
  animFlag?: boolean;
  scaleSize?: number;
}

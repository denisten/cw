import React from 'react';
import {
  menuOpened,
  extraTowerInfoModalClosed,
} from '../../effector/app-condition/events';
import styled, { keyframes } from 'styled-components';
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
import { zIndexForInheritOverlay } from '../../constants';
import { MTSSans } from '../../fonts';
import moneyCircle from './money.png';

const CoinsWrapper = styled.div`
  background-image: url(${coinsBackground});
  background-size: 100%;
  width: 280px;
  height: 64px;
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
  padding: 12px 0 0 56px;
  width: 320px;
  height: 61px;
  z-index: 2;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  line-height: 1;
  letter-spacing: normal;
  color: #0290a7;
  box-sizing: border-box;
  &::after {
    content: "${props => props.content}";
  }
`;

const ProfileButtonWrapper = styled.div<IProfileButtonWrapper>`
  z-index: ${props => props.zIndex};
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
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  font-family: ${MTSSans.BOLD};
`;

const StyleConfig = {
  coins: {
    marginRight: '12px',
    position: 'relative',
    bottom: '8px',
  } as React.CSSProperties,
};

const CoinImg = styled.img<{ moveCoinFinished: boolean }>`
  transition: 0.3s;
  transform: ${props => (props.moveCoinFinished ? 'scale(1.2)' : '')};
`;

const moneyCircleAnim = keyframes`
from {
  transform: scale(0.6);
}
to {
  transform: scale(1);
  opacity: 0;
}
`;

const MoneyCircle = styled.div<{ displayFlag: boolean }>`
  position: absolute;
  top: -27px;
  left: 49px;
  width: 120px;
  height: 120px;
  display: ${props => (props.displayFlag ? 'block' : 'none')};
  background: url(${moneyCircle}) no-repeat center;
  background-size: 100% 100%;
  animation: ${moneyCircleAnim} 0.4s linear forwards;
`;

export const ProfileButton: React.FC<IProfileButton> = ({
  tutorialCondition,
  moveCoinFinished,
}) => {
  const handleClick = () => {
    if (!tutorialCondition) {
      menuOpened(MenuItems.PROFILE);
      extraTowerInfoModalClosed();
      return;
    } else if (
      tutorialCondition === TutorialConditions.PULSE_MENU_CHANGE_CITY_NAME
    ) {
      menuOpened(MenuItems.PROFILE);
      extraTowerInfoModalClosed();
      nextTutorStep();
    } else if (tutorialCondition === TutorialConditions.PULSE_MENU_AUTH) {
      menuOpened(MenuItems.PROFILE);
      extraTowerInfoModalClosed();
      nextTutorStep();
    }
  };
  const { money, name } = useStore(UserDataStore);
  return (
    <ProfileButtonWrapper
      zIndex={
        tutorialCondition === TutorialConditions.PULSE_MENU_CHANGE_CITY_NAME ||
        tutorialCondition === TutorialConditions.PULSE_MENU_AUTH
          ? zIndexForInheritOverlay + 1
          : ZIndexes.UI_BUTTON
      }
      onClick={handleClick}
      animFlag={
        tutorialCondition === TutorialConditions.PULSE_MENU_CHANGE_CITY_NAME ||
        tutorialCondition === TutorialConditions.PULSE_MENU_AUTH
      }
    >
      <NickNameWrapper content={name} />
      <CoinsWrapper>
        <CoinImg
          src={coins}
          alt="coins"
          style={StyleConfig.coins}
          moveCoinFinished={moveCoinFinished}
        />
        <MoneyCircle displayFlag={moveCoinFinished} />
        {money}
      </CoinsWrapper>
      <AvatarWrapper src={userAvatar} />
    </ProfileButtonWrapper>
  );
};

interface IProfileButton {
  tutorialCondition: TutorialConditions;
  tutorialPause?: boolean;
  moveCoinFinished: boolean;
}

interface INickNameWrapper {
  content?: string;
}

interface IProfileButtonWrapper {
  animFlag?: boolean;
  scaleSize?: number;
  zIndex?: number;
}

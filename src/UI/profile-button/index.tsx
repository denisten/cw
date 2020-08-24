import React from 'react';
import styled, { keyframes } from 'styled-components';
import { MenuItems } from '../menu-paragraph';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';
import { TutorialConditions } from '../../effector/tutorial-store/store';
import { nextTutorStep } from '../../effector/tutorial-store/events';
import { UserDataStore } from '../../effector/user-data/store';
import { useStore } from 'effector-react';
import coins from '../icons/coin.svg';
import { defaultScaleSize, scaleAnimation } from '../../hoc/scale-anim';
import { zIndexForInheritOverlay } from '../../constants';
import { MTSSans } from '../../fonts';
import moneyCircle from './money.png';
import { IDisplayFlag } from '../../components/skip-tutorial';
import userAvatarIcon from '../../components/menu/menu-profile/authorized/user-avatar.svg';
import { extraTowerInfoModalClosed } from '../../effector/tower-info-modal-store/events';
import { menuOpened } from '../../effector/menu-store/events';
import { IUserAvatar } from '../../components/menu/menu-profile/authorized';
import backgroundImg from './background.svg';

const CoinsWrapper = styled.div`
  display: flex;
  z-index: 1;
  align-items: center;
  position: relative;
`;

export const UserAvatar = styled.label<IUserAvatar>`
  width: 65px;
  height: 65px;
  margin: 12px 16px 0 4px;
  background: url(${props => props.avatar || userAvatarIcon}) no-repeat;
  background-size: cover;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid white;
  z-index: ${ZIndexes.UI_BUTTON + 1};
`;

const CoinsCountWrapper = styled.span`
  font-size: 20px;
  line-height: 1;
  font-family: ${MTSSans.BOLD};
  color: #001424;
`;

const NickNameWrapper = styled.span`
  font-family: ${MTSSans.BOLD};
  font-size: 20px;
  line-height: 32px;
  color: #001424;
  margin-top: 14px;
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
  font-stretch: normal;
  font-style: normal;
  font-family: ${MTSSans.BOLD};
  cursor: pointer;
  background: url(${backgroundImg}) no-repeat center;
  background-size: 100% 100%;
  width: auto;
  height: 85px;
  display: flex;
  align-items: center;
  padding-right: 20px;
  box-sizing: border-box;
`;

const CoinImg = styled.img.attrs({ src: coins, alt: 'coin' })<ICoinImg>`
  width: 24px;
  height: 24px;
  margin-right: 7px;
  transition: 0.3s;
  transform: ${props =>
    props.isCoinRelocateAnimationEnded ? 'scale(1.2)' : ''};
  transform-origin: bottom;
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

const MoneyCircle = styled.div<IDisplayFlag>`
  position: absolute;
  left: -50px;
  width: 120px;
  height: 120px;
  display: ${props => (props.displayFlag ? 'block' : 'none')};
  background: url(${moneyCircle}) no-repeat center;
  background-size: 100% 100%;
  animation: ${moneyCircleAnim} 0.4s linear forwards;
`;

const NameBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const handleClick = (tutorialCondition: TutorialConditions) => {
  if (!tutorialCondition) {
    menuOpened(MenuItems.PROFILE);
    extraTowerInfoModalClosed();
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

export const ProfileButton: React.FC<IProfileButton> = ({
  tutorialCondition,
  isCoinRelocateAnimationEnded,
}) => {
  const { money, name, avatar } = useStore(UserDataStore);

  const zIndex =
    tutorialCondition === TutorialConditions.PULSE_MENU_CHANGE_CITY_NAME ||
    tutorialCondition === TutorialConditions.PULSE_MENU_AUTH
      ? zIndexForInheritOverlay + 1
      : ZIndexes.UI_BUTTON;

  const animFlag =
    tutorialCondition === TutorialConditions.PULSE_MENU_CHANGE_CITY_NAME ||
    tutorialCondition === TutorialConditions.PULSE_MENU_AUTH;

  return (
    <ProfileButtonWrapper
      zIndex={zIndex}
      onClick={() => handleClick(tutorialCondition)}
      animFlag={animFlag}
    >
      <UserAvatar avatar={avatar} />
      <NameBlock>
        <NickNameWrapper>{name}</NickNameWrapper>
        <CoinsWrapper>
          <CoinImg
            isCoinRelocateAnimationEnded={isCoinRelocateAnimationEnded}
          />
          <MoneyCircle displayFlag={isCoinRelocateAnimationEnded} />
          <CoinsCountWrapper>{money}</CoinsCountWrapper>
        </CoinsWrapper>
      </NameBlock>
    </ProfileButtonWrapper>
  );
};

interface IProfileButton {
  tutorialCondition: TutorialConditions;
  tutorialPause?: boolean;
  isCoinRelocateAnimationEnded: boolean;
}

interface IProfileButtonWrapper {
  animFlag?: boolean;
  scaleSize?: number;
  zIndex?: number;
}

interface ICoinImg {
  isCoinRelocateAnimationEnded: boolean;
}

import React from 'react';
import { menuOpened } from '../../effector/app-condition/events';
import styled, { keyframes } from 'styled-components';
import { MenuItems } from '../menu-paragraph';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';
import { TutorialConditions } from '../../effector/tutorial-store/store';
import { nextTutorStep } from '../../effector/tutorial-store/events';
import { UserDataStore } from '../../effector/user-data/store';
import { useStore } from 'effector-react';
import nameBackground from './name-background.svg';
import coinsBackground from './coins-background.svg';
import coins from '../icons/coin.svg';
import { defaultScaleSize, scaleAnimation } from '../../hoc/scale-anim';
import { zIndexForInheritOverlay } from '../../constants';
import { MTSSans } from '../../fonts';
import moneyCircle from './money.png';
import { IDisplayFlag } from '../../components/skip-tutorial';
import userAvatarIcon from '../../components/menu/profile/authorized/user-avatar.svg';
import { extraTowerInfoModalClosed } from '../../effector/tower-info-modal-store/events';
import { IUserAvatar } from '../../components/menu/profile/authorized';

const CoinsWrapper = styled.div`
  display: flex;
  width: 275px;
  height: 39px;
  position: absolute;
  left: 24px;
  top: 64px;
  background-repeat: no-repeat;
  background-image: url(${coinsBackground});
  background-size: 100%;
  z-index: 1;
`;
export const UserAvatar = styled.label<IUserAvatar>`
  width: 91px;
  height: 91px;
  margin: 0 16px 0 4px;
  background: url(${userAvatarIcon}) no-repeat;
  background-size: cover;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;

  position: absolute;
  top: 38px;
  left: 38px;
  transform: translate(-50%, -50%);
  border: 1px solid white;
  z-index: ${ZIndexes.UI_BUTTON + 1};
`;

const CoinsCountWrapper = styled.div`
  width: 100px;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  box-sizing: border-box;
  line-height: 32px;
  color: #001424;
  position: relative;
  left: 120px;
  top: 18px;
  bottom: 8px;
`;

const NickNameWrapper = styled.div<INickNameWrapper>`
  background-image: url(${nameBackground});
  background-size: 100%;
  padding: 12px 40px 0 74px;
  min-width: 289.91px;
  min-height: 58px; 
  z-index: 2; 
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  top: 6px;
  left:30px;
  &::after {
    content: "${props => props.content}";
    font-size: 36px;
    line-height: 32px;
    letter-spacing: normal;
    color: #fff;    
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
  cursor: pointer;
`;

const CoinImg = styled.img<{ isCoinRelocateAnimationEnded: boolean }>`
  width: 30px;
  height: 30px;
  position: relative;
  left: 90px;
  top: 20px;
  margin-right: 12px;
  transition: 0.3s;
  transform: ${props =>
      props.isCoinRelocateAnimationEnded ? 'scale(1.2)' : ''}
    translate(-50%, -50%);
  transform-origin: top center;
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
  top: -40px;
  left: 27.5px;
  width: 120px;
  height: 120px;
  margin-right: 7px;
  display: ${props => (props.displayFlag ? 'block' : 'none')};
  background: url(${moneyCircle}) no-repeat center;
  background-size: 100% 100%;
  animation: ${moneyCircleAnim} 0.4s linear forwards;
`;

const styledConfig = {
  userAvatar: {} as React.CSSProperties,
  header: {},
};

export const ProfileButton: React.FC<IProfileButton> = ({
  tutorialCondition,
  isCoinRelocateAnimationEnded,
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
          isCoinRelocateAnimationEnded={isCoinRelocateAnimationEnded}
        />
        <MoneyCircle displayFlag={isCoinRelocateAnimationEnded} />
        <CoinsCountWrapper>{money}</CoinsCountWrapper>
      </CoinsWrapper>
      <UserAvatar style={styledConfig.userAvatar} />
    </ProfileButtonWrapper>
  );
};

interface IProfileButton {
  tutorialCondition: TutorialConditions;
  tutorialPause?: boolean;
  isCoinRelocateAnimationEnded: boolean;
}

interface INickNameWrapper {
  content?: string;
}

interface IProfileButtonWrapper {
  animFlag?: boolean;
  scaleSize?: number;
  zIndex?: number;
}

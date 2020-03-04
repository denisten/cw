import React from 'react';
import profileImg from './button_nickname.png';
import { menuOpened, nextTutorStep } from '../../effector/app-condition/events';
import { ImgWrapper } from '../../UI/img-wrapper';
import styled from 'styled-components';
import { TutorialConditions } from '../../effector/app-condition/store';
import { MenuItems } from '../menu-paragraph';
import { NickName } from '../nickname';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';
import { AvatarWrapper } from '../avatar-wrapper';
import userAvatar from './profile-img.png';
import { MoneyWrapper } from '../money-wrapper';

const MoneyCounterWrapper = styled.div`
  position: absolute;
  top: 60%;

  left: 24%;
  font-size: 23px;
`;

const StyleConfig = {
  nickNameButton: {
    height: '109px',
    width: '321px',
    zIndex: ZIndexes.UI_BUTTON,
    top: 3.7,
    left: 3.2,
    hoverFlag: true,
  },

  avatar: {
    height: '106px',
    left: -5,
    top: -13,
  },

  money: {
    fontSize: '23px',
  },
};

export const ProfileButton: React.FC<IProfileButton> = ({
  tutorialCondition,
}) => {
  const handleClick = () => {
    if (!tutorialCondition) {
      menuOpened(MenuItems.PROFILE);
      return;
    }
    if (tutorialCondition === TutorialConditions.MENU_ARROW) {
      menuOpened(MenuItems.PROFILE);
      nextTutorStep();
    }
  };
  return (
    <ImgWrapper
      src={profileImg}
      callBack={handleClick}
      animFlag={tutorialCondition === TutorialConditions.MENU_ARROW}
      {...StyleConfig.nickNameButton}
    >
      <AvatarWrapper src={userAvatar} {...StyleConfig.avatar} />
      <NickName nickName="NickName" />
      <MoneyCounterWrapper>
        <MoneyWrapper count={228} {...StyleConfig.money} />
      </MoneyCounterWrapper>
    </ImgWrapper>
  );
};

interface IProfileButton {
  tutorialCondition: TutorialConditions;
}

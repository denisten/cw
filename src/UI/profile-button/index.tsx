import React from 'react';
import profileImg from './button_nickname.png';
import { menuOpened, nextTutorStep } from '../../effector/app-condition/events';
import { ImgWrapper } from '../../UI/img-wrapper';
import styled from 'styled-components';
import { TutorialConditions } from '../../effector/app-condition/store';
import { MenuItems } from '../menu-paragraph';
import { NickName } from '../nickname';

type MoneyCounterWrapperProps = {
  money: number;
};

const MoneyCounterWrapper = styled.span<MoneyCounterWrapperProps>`
    color: #fff;
    position: absolute;
    top: 43%;
    left: 36%;
    font-size: 1.5em;
    &:after {
      content: "${props => props.money}"
    }
`;

const StyleConfig = {
  height: '10.1%',
  zIndex: 10,
  top: 3.7,
  left: 3.2,
  hoverFlag: true,
};

type ProfileButtonProps = {
  tutorialCondition: TutorialConditions;
};

export const ProfileButton: React.FC<ProfileButtonProps> = ({
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
    <ImgWrapper src={profileImg} callBack={handleClick} {...StyleConfig}>
      <NickName nickName="NickName" />
      <MoneyCounterWrapper money={228} />
    </ImgWrapper>
  );
};

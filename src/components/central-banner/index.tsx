import React, { useState, useEffect } from 'react';
import banner from './banner.png';
import styled from 'styled-components';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { MTSSans } from '../../fonts';
import { useStore } from 'effector-react';
import { UserDataStore } from '../../effector/user-data/store';
import { MenuItems } from '../../UI/menu-paragraph';
import {
  menuOpened,
  setOpenPopUpState,
  extraTowerInfoModalClosed,
} from '../../effector/app-condition/events';
import { TypesOfPopUps } from '../../UI/pop-up';
import { mouseMoveProtect } from '../../utils/mouse-move-protect';
import { TutorialConditions } from '../../effector/tutorial-store/store';

const Banner = styled.div`
  width: 175px;
  height: 195px;
  background: url(${banner}) no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  left: 59%;
  top: 36%;
  z-index: ${ZIndexes.UI_BUTTON};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 58px;
  cursor: pointer;
`;

const Title = styled.span`
  text-align: center;
  color: #35647b;
  text-transform: uppercase;
  font-family: ${MTSSans.MEDIUM};
  transform: skewY(27.5deg);
  letter-spacing: -1px;
  font-size: 14px;
  position: relative;
  right: 8px;
  line-height: 1.2;
`;

const HeadTitle = styled(Title)<{ fontSize: string }>`
  line-height: 1.5;
  font-size: 14px;
  font-family: ${MTSSans.BOLD};
  letter-spacing: -1px;
  font-size: ${props => props.fontSize};
`;

enum TextSize {
  SHORT = 6,
  MEDIUM = 10,
  BIG = 12,
}

const returnFontSize = (wordLength: number) => {
  if (wordLength <= TextSize.SHORT) {
    return '26px';
  } else if (wordLength > TextSize.SHORT && wordLength <= TextSize.MEDIUM) {
    return '17px';
  } else {
    return '13px';
  }
};

export const CentralBanner: React.FC<{
  tutorialCondition: TutorialConditions;
}> = ({ tutorialCondition }) => {
  const { worldName } = useStore(UserDataStore);
  const [wordLength, setWordLength] = useState(0);
  useEffect(() => {
    setWordLength(worldName.length);
  }, [worldName]);

  const openAndEditCityName = () => {
    if (!tutorialCondition) {
      extraTowerInfoModalClosed();
      menuOpened(MenuItems.PROFILE);
      setOpenPopUpState(TypesOfPopUps.EDIT_WORLD_NAME);
    }
  };

  const maxMouseMoveFaultAfterClick = 5;
  const mouseMoveProtectInstance = mouseMoveProtect(
    openAndEditCityName,
    maxMouseMoveFaultAfterClick
  );

  return (
    <Banner
      onMouseDown={mouseMoveProtectInstance.handleMouseDown}
      onMouseUp={mouseMoveProtectInstance.handleMouseUp}
      onMouseMove={mouseMoveProtectInstance.handleMouseMove}
    >
      <Title>Добро</Title>
      <Title>пожаловать!</Title>
      <HeadTitle fontSize={returnFontSize(wordLength)}>{worldName}</HeadTitle>
    </Banner>
  );
};

import React, { useState, useEffect } from 'react';
import banner from './banner.png';
import styled from 'styled-components';
import { ZIndexes } from '../../root-component/z-indexes-enum';
import { MTSSans } from '../../../fonts';
import { setOpenPopUpState } from '../../../effector/app-condition/events';
import { TypesOfPopUps } from '../../../UI/pop-up';
import { UserDataStore } from '../../../effector/user-data/store';
import { mouseMoveProtect } from '../../../utils/mouse-move-protect';
import { TutorialConditions } from '../../../effector/tutorial-store/store';
import { MenuItems } from '../../../UI/menu-paragraph';
import { extraTowerInfoModalClosed } from '../../../effector/tower-info-modal-store/events';
import { useStore } from 'effector-react';
import { menuOpened } from '../../../effector/menu-store/events';
import * as R from 'ramda';

const Banner = styled.div`
  width: 175px;
  height: 195px;
  background: url(${banner}) no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  left: 52%;
  top: 43%;
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
  font-size: 13px;
  position: relative;
  right: 8px;
  line-height: 1;
`;

const HeadTitle = styled(Title)<IHeadTitle>`
  line-height: 1.2;
  font-family: ${MTSSans.BOLD};
  letter-spacing: -1px;
  font-size: ${props => props.fontSize};
  margin: 4px 0px 4px 0px;
`;

enum TextSize {
  SHORT = 6,
  MEDIUM = 10,
  BIG = 12,
}

const isLessThanShort = (wordLength: number) => wordLength <= TextSize.SHORT;

const isMoreThanShort = (wordLength: number) =>
  wordLength > TextSize.SHORT && wordLength <= TextSize.MEDIUM;

const calculateFontSize = R.cond([
  [isLessThanShort, R.always('26px')],
  [isMoreThanShort, R.always('17px')],
  [R.T, R.always('14px')],
]);

const maxMouseMoveFaultAfterClick = 5;

export const CentralBanner: React.FC<ICentralBanner> = ({
  tutorialCondition,
}) => {
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
      <HeadTitle fontSize={calculateFontSize(wordLength as never)}>
        {worldName}
      </HeadTitle>
      <Title>Добро</Title>
      <Title>пожаловать!</Title>
    </Banner>
  );
};

interface ICentralBanner {
  tutorialCondition: TutorialConditions;
}

interface IHeadTitle {
  fontSize: string;
}

import React from 'react';
import styled from 'styled-components';
import { defaultScaleSize, scaleAnimation } from '../../../../hoc/scale-anim';
import {
  TutorialOverlay,
  TutorialOverlayTopLayer,
} from '../../../tutorial-overlay';
import {
  maxCityNameLength,
  zIndexForInheritOverlay,
} from '../../../../constants';
import {
  disableTutorialMode,
  nextTutorStep,
} from '../../../../effector/tutorial-store/events';
import {
  TutorialConditions,
  TutorialStore,
} from '../../../../effector/tutorial-store/store';
import { RowWrapper } from '../../../../UI/row-wrapper';
import { CoinsWallet } from '../../../../UI/wallet';
import { MTSSans } from '../../../../fonts';
import { setOpenPopUpState } from '../../../../effector/app-condition/events';
import { PopUp, TypesOfPopUps } from '../../../../UI/pop-up';
import { UserDataStore } from '../../../../effector/user-data/store';
import { Button, ButtonClassNames } from '../../../../UI/button';
import { StyledSpan } from '../../../../UI/span';
import { handleAuthButtonClick } from '../../../../utils/handle-auth-button-click';
import penImg from './pen.svg';
import profileIcon from './profile-icon.svg';
import { useStore } from 'effector-react';

const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 51px;
  box-sizing: border-box;
`;

const PenWrapper = styled.img<IPenWrapper>`
  cursor: pointer;
  animation-name: ${props =>
    props.animFlag
      ? scaleAnimation(props.scaleSize || defaultScaleSize)
      : 'none'};
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 1s;
  margin-left: 12px;
`;

const WorldTitle = styled(StyledSpan)`
  font-family: ${MTSSans.BLACK};
  font-size: 24px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.6px;
  text-align: center;
  color: #001424;
  margin-right: 9px;
  cursor: pointer;
`;

const styledConfig = {
  coinsWallet: {
    marginRight: '60px',
  } as React.CSSProperties,
  profileIcon: {
    paddingBottom: '32px',
  },
  rowWrapper: {
    padding: '28px 10px',
    margin: '31px 0 0 0',
    left: '12px',
    background: 'white',
  },
  moneyWallet: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  popUpStyles: {
    width: 487,
    height: 305,
    padding: '76px 79px 0 79px',
  },
  penWrapper: {
    alt: 'pen',
    scaleSize: 1.4,
  },
};

const NotAuthorizedProfile: React.FC<INotAuthorizedProfile> = ({
  openPopUpState,
}) => {
  const { worldName, money } = useStore(UserDataStore);
  const { tutorialCondition } = useStore(TutorialStore);

  const handleButtonClick = () => {
    if (tutorialCondition === TutorialConditions.PULSE_AUTH_BUTTON) {
      disableTutorialMode();
    }
    handleAuthButtonClick();
  };

  const handlePenClick = () => {
    setOpenPopUpState(TypesOfPopUps.EDIT_WORLD_NAME);
    if (tutorialCondition === TutorialConditions.PULSE_EDIT_CHANGE_CITY_NAME)
      nextTutorStep();
  };

  return (
    <ProfileWrapper>
      <PopUp
        callback={() => setOpenPopUpState(TypesOfPopUps.DISABLED)}
        displayFlag={openPopUpState !== TypesOfPopUps.DISABLED}
        popUpStyles={styledConfig.popUpStyles}
        maxInputValueLength={maxCityNameLength}
        title="Введите название города"
        initValue={worldName}
      />
      <RowWrapper style={styledConfig.moneyWallet}>
        <CoinsWallet sum={String(money)} style={styledConfig.coinsWallet} />
      </RowWrapper>
      <TutorialOverlayTopLayer
        zIndex={
          tutorialCondition === TutorialConditions.PULSE_EDIT_CHANGE_CITY_NAME
            ? zIndexForInheritOverlay + 1
            : zIndexForInheritOverlay - 1
        }
      >
        <RowWrapper {...styledConfig.rowWrapper}>
          <WorldTitle onClick={handlePenClick}>
            {worldName}
            <PenWrapper
              {...styledConfig.penWrapper}
              src={penImg}
              animFlag={
                tutorialCondition ===
                TutorialConditions.PULSE_EDIT_CHANGE_CITY_NAME
              }
            />
          </WorldTitle>
        </RowWrapper>
      </TutorialOverlayTopLayer>
      <img src={profileIcon} alt="profile" style={styledConfig.profileIcon} />
      <TutorialOverlayTopLayer
        zIndex={
          tutorialCondition === TutorialConditions.PULSE_AUTH_BUTTON
            ? zIndexForInheritOverlay + 1
            : zIndexForInheritOverlay - 1
        }
      >
        <Button
          pulseAnimFlag={
            tutorialCondition === TutorialConditions.PULSE_AUTH_BUTTON
          }
          className={ButtonClassNames.NORMAL}
          content="Войти"
          callback={handleButtonClick}
        />
      </TutorialOverlayTopLayer>
      <TutorialOverlay
        displayFlag={
          tutorialCondition === TutorialConditions.PULSE_AUTH_BUTTON ||
          tutorialCondition === TutorialConditions.PULSE_EDIT_CHANGE_CITY_NAME
        }
        zIndex={zIndexForInheritOverlay}
      />
    </ProfileWrapper>
  );
};

interface IPenWrapper {
  scaleSize?: number;
  animFlag?: boolean;
}
interface INotAuthorizedProfile {
  openPopUpState: TypesOfPopUps;
}

export default NotAuthorizedProfile;

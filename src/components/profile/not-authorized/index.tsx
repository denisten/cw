import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledSpan } from '../../../UI/span';
import { MTSSans } from '../../../fonts';
import profileIcon from './profile-icon.svg';
import { Button, ButtonClassNames } from '../../../UI/button';
import { UserDataStore } from '../../../effector/user-data/store';
import penImg from './pen.svg';
import { PopUp } from '../../../UI/pop-up';
import { useStore } from 'effector-react';
import { RowWrapper } from '../../../UI/row-wrapper';
import { MoneyWallet } from '../../../UI/wallet/money';
import { CoinsWallet } from '../../../UI/wallet/coins';
import {
  TutorialConditions,
  TutorialStore,
} from '../../../effector/tutorial-store/store';
import {
  nextTutorStep,
  turnOffTutorialMode,
} from '../../../effector/tutorial-store/events';
import { handleAuthButtonClick } from '../../../utils/handle-auth-button-click';
import { defaultScaleSize, scaleAnimation } from '../../../hoc/scale-anim';

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
`;

const MoneyWalletWrapper = styled.div`
  display: flex;
  position: relative;
  left: 156px;
`;

const styledConfig = {
  profileIcon: {
    paddingBottom: '32px',
  },
  rowWrapper: {
    padding: '59px 0 28px 0',
    left: '12px',
  },
  moneyWallet: {
    marginRight: '4px',
  },
};

export const NotAuthorizedProfile = () => {
  const [popUpDisplayFlag, setPopUpDisplayFlag] = useState(false);
  const { worldName, money, coins } = useStore(UserDataStore);
  const { tutorialCondition } = useStore(TutorialStore);

  const handleButtonClick = () => {
    if (tutorialCondition === TutorialConditions.PULSE_AUTH_BUTTON) {
      turnOffTutorialMode();
    }
    handleAuthButtonClick();
  };

  const handlePenClick = () => {
    setPopUpDisplayFlag(!popUpDisplayFlag);
    if (tutorialCondition === TutorialConditions.PULSE_EDIT_CHANGE_CITY_NAME)
      nextTutorStep();
  };

  return (
    <ProfileWrapper>
      <PopUp
        callback={() => setPopUpDisplayFlag(false)}
        displayFlag={popUpDisplayFlag}
      />
      <MoneyWalletWrapper>
        <MoneyWallet sum={String(money)} style={styledConfig.moneyWallet} />
        <CoinsWallet sum={String(coins)} />
      </MoneyWalletWrapper>
      <RowWrapper {...styledConfig.rowWrapper}>
        <WorldTitle>{worldName || 'Мой мир'}</WorldTitle>
        <PenWrapper
          src={penImg}
          alt="pen"
          onClick={handlePenClick}
          animFlag={
            tutorialCondition === TutorialConditions.PULSE_EDIT_CHANGE_CITY_NAME
          }
          scaleSize={1.4}
        />
      </RowWrapper>
      <img src={profileIcon} alt="profile" style={styledConfig.profileIcon} />
      {!tutorialCondition ||
      tutorialCondition === TutorialConditions.PULSE_AUTH_BUTTON ? (
        <Button
          animFlag={tutorialCondition === TutorialConditions.PULSE_AUTH_BUTTON}
          className={ButtonClassNames.NORMAL}
          content="Войти"
          callback={handleButtonClick}
        />
      ) : null}
    </ProfileWrapper>
  );
};

interface IPenWrapper {
  scaleSize?: number;
  animFlag?: boolean;
}

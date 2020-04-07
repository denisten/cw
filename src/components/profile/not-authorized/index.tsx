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
import { turnOffTutorialMode } from '../../../effector/tutorial-store/events';
import { handleAuthButtonClick } from '../../../utils/handle-auth-button-click';

const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 51px;
  box-sizing: border-box;
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
  penImg: {
    cursor: 'pointer',
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
        <img
          src={penImg}
          alt="pen"
          onClick={() => setPopUpDisplayFlag(!popUpDisplayFlag)}
          style={styledConfig.penImg}
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

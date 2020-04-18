import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { StyledSpan } from '../../../UI/span';
import { MTSSans } from '../../../fonts';
import { Button, ButtonClassNames } from '../../../UI/button';
import { UserDataStore } from '../../../effector/user-data/store';
import penImg from '../not-authorized/pen.svg';
import { maxSymbolsAlert, minSymbolsAlert, PopUp } from '../../../UI/pop-up';
import { useStore } from 'effector-react';
import { RowWrapper } from '../../../UI/row-wrapper';
import { MoneyWallet } from '../../../UI/wallet/money';
import { CoinsWallet } from '../../../UI/wallet/coins';
import userAvatarIcon from './user-avatar.svg';
import { ColumnWrapper } from '../../../UI/column-wrapper';
import { Input } from '../../../UI/input';
import exitImg from './exit.svg';
import { editUserData } from '../../../effector/user-data/events';
import { CookieService } from '../../../sevices/cookies';
import { logout } from '../../../api';
import { Dropdown } from '../../../UI/dropdown';
import { DaysNumArr, MonthsStringArr } from '../../../constants';

const ExitText = styled(StyledSpan)<ISpan>`
  font-family: ${MTSSans.REGULAR};
  font-size: 16px;
  color: #02acc8;
  margin-left: 8px;
  &::after {
  content: "${props => props.content}"
  }
`;

const ProgressBar = styled.div`
  width: 135px;
  height: 14px;
  border-radius: 5.8px;
  box-shadow: inset 0 0 1px 0 rgba(32, 189, 218, 0.18);
  background-color: #d6f0f4;
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    width: 55px;
    height: 14px;
    border-radius: 5.8px;
    box-shadow: inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
    background-image: linear-gradient(
      to bottom,
      #5adcf9,
      #43d0ed 40%,
      #3acbe8 44%,
      #5edffc
    );
  }
`;

const NickNameWrapper = styled(StyledSpan)<ISpan>`
  font-family: ${MTSSans.REGULAR};
  line-height: 1.2;
  color: #001424;
  width: 252px;
  &::after {
  content: "${props => props.content}"
  }
`;

const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 40px;
  box-sizing: border-box;
`;

const WorldTitle = styled(StyledSpan)<ISpan>`
  font-family: ${MTSSans.BLACK};
  font-size: 24px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.6px;
  text-align: center;
  color: #001424;
  margin-right: 9px;
  &::after {
  content: "${props => props.content}"
  }
`;

const InputTitle = styled(StyledSpan)<ISpan>`
  font-family: ${MTSSans.REGULAR};
  font-size: 14px;
  color: #02adc9;
  height: 20px;
  margin-right: 21px;
  &::after {
    content: "${props => props.content}"
  }
`;

const styledConfig = {
  profileIcon: {
    marginLeft: '4px',
  },
  rowWrapper: {
    padding: '48px 0 33px 0',
    left: '12px',
  },
  penImg: {
    cursor: 'pointer',
  },
  moneyWallet: {
    marginRight: '4px',
  },
  profileDataColumnWrapper: {
    displayFlag: true,
    position: 'relative',
    margin: '0 12px 0 8px',
  },
  inputWrapper: {
    position: 'relative',
    displayFlag: true,
  },
  nameInput: { marginRight: '16px' },
  exitWrapper: {
    margin: '30px 0 0 0',
    cursor: 'pointer',
  },
  nameRowWrapper: {
    alignItems: 'center',
    margin: '0 0 24px 0',
    left: '20px',
  },
};

export const minNameLength = 3,
  maxNameLength = 25;

let nameInputHint = '';

export const AuthorizedProfile = () => {
  const [popUpDisplayFlag, setPopUpDisplayFlag] = useState(false);
  const { worldName, money, coins, name, birthday } = useStore(UserDataStore);
  const [localName, setLocalName] = useState(name);
  const [birthdayDate, setBirthdayDate] = useState(birthday);
  const [nameInputHasError, setNameInputHasError] = useState(false);

  const handleChangeNameInput = (value: string) => {
    setLocalName(value);
    if (value.length < minNameLength) {
      nameInputHint = minSymbolsAlert + minNameLength;
      setNameInputHasError(true);
    } else if (value.length > maxNameLength) {
      nameInputHint = maxSymbolsAlert + maxNameLength;
      setNameInputHasError(true);
    } else {
      setNameInputHasError(false);
    }
  };

  const onSubmitHandler = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (
      localName.length >= minNameLength &&
      localName.length <= maxNameLength
    ) {
      editUserData({
        name: localName,
        birthday: birthdayDate,
      });
    } else {
      setNameInputHasError(true);
    }
  };

  const handleExitButtonClick = () => {
    CookieService.resetToken();
    logout();
  };

  return (
    <ProfileWrapper>
      <PopUp
        callback={() => setPopUpDisplayFlag(false)}
        displayFlag={popUpDisplayFlag}
      />
      <RowWrapper>
        <img src={userAvatarIcon} alt="user" style={styledConfig.profileIcon} />
        <ColumnWrapper {...styledConfig.profileDataColumnWrapper}>
          <NickNameWrapper content={name || 'sss'} />
          <ProgressBar />
        </ColumnWrapper>
        <RowWrapper>
          <MoneyWallet sum={String(money)} style={styledConfig.moneyWallet} />
          <CoinsWallet sum={String(coins)} />
        </RowWrapper>
      </RowWrapper>
      <RowWrapper {...styledConfig.rowWrapper}>
        <WorldTitle content={worldName || 'Мой мир'} />
        <img
          src={penImg}
          alt="pen"
          onClick={() => setPopUpDisplayFlag(!popUpDisplayFlag)}
          style={styledConfig.penImg}
        />
      </RowWrapper>
      <ColumnWrapper {...styledConfig.inputWrapper}>
        <RowWrapper {...styledConfig.nameRowWrapper}>
          <InputTitle content="Имя" />
          <Input
            formPadding={13}
            value={localName}
            onSubmitHandler={onSubmitHandler}
            onChangeHandler={e => handleChangeNameInput(e.target.value)}
            style={styledConfig.nameInput}
            hasError={nameInputHasError}
            hint={nameInputHint}
          />
        </RowWrapper>
        <RowWrapper alignItems="center" margin="0 0 32px 0" right="53px">
          <InputTitle content="Дата рождения" />
          <Dropdown
            options={DaysNumArr}
            optionsHeight={329}
            top={40}
            style={{ marginRight: '16px' }}
            value={birthdayDate.dd}
            onChangeCallback={el =>
              setBirthdayDate(prevState => ({ dd: el, mm: prevState.mm }))
            }
          />
          <Dropdown
            options={MonthsStringArr}
            optionsHeight={329}
            top={40}
            width={149}
            value={birthdayDate.mm}
            onChangeCallback={el =>
              setBirthdayDate(prevState => ({ dd: prevState.dd, mm: el }))
            }
          />
        </RowWrapper>
      </ColumnWrapper>
      <Button
        className={ButtonClassNames.NORMAL}
        content="Сохранить"
        callback={onSubmitHandler}
      />
      <RowWrapper style={styledConfig.exitWrapper}>
        <img src={exitImg} alt="exit" />
        <ExitText content="Выйти" onClick={handleExitButtonClick} />
      </RowWrapper>
    </ProfileWrapper>
  );
};

interface ISpan {
  content?: string;
}

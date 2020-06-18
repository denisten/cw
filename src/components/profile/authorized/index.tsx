import React, { FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { StyledSpan } from '../../../UI/span';
import { MTSSans } from '../../../fonts';
import { Button, ButtonClassNames } from '../../../UI/button';
import { IBirthday, UserDataStore } from '../../../effector/user-data/store';
import penImg from '../not-authorized/pen.svg';
import {
  maxSymbolsAlert,
  minSymbolsAlert,
  PopUp,
  IPopUp,
  TypesOfPopUps,
} from '../../../UI/pop-up';
import { useStore } from 'effector-react';
import { RowWrapper } from '../../../UI/row-wrapper';
import { MoneyWallet } from '../../../UI/wallet/money';
import { CoinsWallet } from '../../../UI/wallet/coins';
import userAvatarIcon from './user-avatar.svg';
import { ColumnWrapper } from '../../../UI/column-wrapper';
import { Input } from '../../../UI/input';
import exitImg from './exit.svg';
import { CookieService } from '../../../sevices/cookies';
import { Dropdown } from '../../../UI/dropdown';
import {
  DaysNumArr,
  MonthsStringArr,
  minNameLength,
  maxUserNameLength,
  maxCityNameLength,
} from '../../../constants';
import { updateUserData } from '../../../utils/update-user-data';
import { birthdayParser } from '../../../utils/birthday-parser';
import { setOpenPopUpState } from '../../../effector/app-condition/events';
import { Assistent } from '../../../UI/assistent';
import camera from './camera.svg';
import { logout } from '../../../effector/user-data/events';

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

const UserAvatar = styled.label<{ avatar: string | null }>`
  width: 60px;
  height: 60px;
  margin: 0 16px 0 4px;
  background: url(${props => props.avatar || userAvatarIcon}) no-repeat;
  background-size: cover;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;

  input {
    display: none;
  }
  &::before {
    width: 100%;
    height: 100%;
    content: '';
    display: block;
    background: url(${camera}) no-repeat center, rgba(0, 0, 0, 0.5);
    background-size: 18px 18px;
    opacity: 0;
    transition: 0.4s;
  }
  &:hover::before {
    opacity: 1;
  }
`;

const styledConfig = {
  profileIcon: {
    marginLeft: '4px',
  },
  rowWrapper: {
    padding: '36px 0 22px 0',
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
  birthdayRowWrapper: {
    alignItems: 'center',
    margin: '0 0 32px 0',
    right: '53px',
  },

  popUpEditUserNameStyles: {
    width: 487,
    height: 305,
    padding: '76px 79px 0 79px',
  },
  popUpEditAssistantNameStyles: {
    width: 615,
    height: 305,
    padding: '60px 30px 0 262px',
  },
  assistantStyle: {
    top: '0px',
    left: '380px',
  },
};

let nameInputHint = '';

export const AuthorizedProfile: React.FC<IAuthorizedProfile> = ({
  openPopUpState,
}) => {
  const {
    worldName,
    money,
    coins,
    name,
    birthday,
    userSessionSocket,
    assistantName,
    avatar,
  } = useStore(UserDataStore);
  const [localName, setLocalName] = useState(name);
  const [birthdayDate, setBirthdayDate] = useState<IBirthday>(birthday);
  const [nameInputHasError, setNameInputHasError] = useState(false);

  useEffect(() => {
    if (localName !== name) setLocalName(name);
    if (birthdayDate !== birthday) setBirthdayDate(birthday);
  }, [name, birthday]);

  const handleChangeNameInput = (value: string) => {
    setLocalName(value);
    if (value.length < minNameLength) {
      nameInputHint = minSymbolsAlert + minNameLength;
      setNameInputHasError(true);
    } else if (value.length > maxUserNameLength) {
      nameInputHint = maxSymbolsAlert + maxUserNameLength;
      setNameInputHasError(true);
    } else {
      setNameInputHasError(false);
    }
  };

  const onSubmitHandler = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (
      localName.length >= minNameLength &&
      localName.length <= maxUserNameLength
    ) {
      updateUserData({ birthday: birthdayDate, name: localName });
    } else {
      setNameInputHasError(true);
    }
  };

  const handleExitButtonClick = async () => {
    CookieService.resetToken();
    await logout('');
    if (userSessionSocket) userSessionSocket.disconnect();
  };

  const popUpConfig: IPopUpConfig = {
    [TypesOfPopUps.EDIT_WORLD_NAME]: {
      callback: () => setOpenPopUpState(TypesOfPopUps.DISABLED),
      popUpStyles: styledConfig.popUpEditUserNameStyles,
      title: 'Введите название города',
      initValue: worldName,
      maxInputValueLength: maxCityNameLength,
    },
    [TypesOfPopUps.EDIT_ASSISTANT_NAME]: {
      callback: () => setOpenPopUpState(TypesOfPopUps.DISABLED),
      popUpStyles: styledConfig.popUpEditAssistantNameStyles,
      title: 'Назовите вашего робота',
      initValue: assistantName,
      maxInputValueLength: 14,
      popUpType: TypesOfPopUps.EDIT_ASSISTANT_NAME,
    },
  };

  return (
    <ProfileWrapper>
      <PopUp
        {...popUpConfig[openPopUpState]}
        displayFlag={openPopUpState !== TypesOfPopUps.DISABLED}
      />
      <RowWrapper>
        <UserAvatar avatar={avatar}>
          <input type="file" accept="image/jpeg,image/png,image/svg" />
        </UserAvatar>
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
          onClick={() => setOpenPopUpState(TypesOfPopUps.EDIT_WORLD_NAME)}
          style={styledConfig.penImg}
        />
      </RowWrapper>
      <ColumnWrapper {...styledConfig.inputWrapper}>
        <Assistent
          assistantStyle={styledConfig.assistantStyle}
          assistantName={assistantName}
          callBack={() => setOpenPopUpState(TypesOfPopUps.EDIT_ASSISTANT_NAME)}
        />
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
        <RowWrapper {...styledConfig.birthdayRowWrapper}>
          <InputTitle content="Дата рождения" />
          <Dropdown
            options={DaysNumArr}
            optionsHeight={329}
            top={40}
            style={{ marginRight: '16px' }}
            value={birthdayParser(birthdayDate.dd)}
            onChangeCallback={el =>
              setBirthdayDate(prevState => ({ dd: el, mm: prevState.mm }))
            }
          />
          <Dropdown
            options={MonthsStringArr}
            optionsHeight={329}
            top={40}
            width={149}
            value={MonthsStringArr[+birthdayDate.mm - 1]}
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

interface IAuthorizedProfile {
  openPopUpState: TypesOfPopUps;
}

interface IPopUpConfig {
  [key: string]: IPopUp;
}

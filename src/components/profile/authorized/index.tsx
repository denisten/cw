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
import { CoinsWallet } from '../../../UI/wallet';

const ExitText = styled(StyledSpan)<ISpan>`
  font-family: ${MTSSans.REGULAR};
  font-size: 16px;
  color: #02acc8;
  margin-left: 8px;
  &::after {
  content: "${props => props.content}"
  }
`;

const NickNameWrapper = styled(StyledSpan)<ISpan>`
  font-family: ${MTSSans.REGULAR};
  line-height: 1.2;
  color: #001424;
  width: 140px;
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

const defaultInputTitleMarginRight = 21;

export const InputTitle = styled(StyledSpan)<ISpan>`
  font-family: ${MTSSans.REGULAR};
  font-size: 14px;
  color: #02adc9;
  height: 20px;
  margin-right: ${props => props.marginRight || defaultInputTitleMarginRight}px;
  &::after {
    content: "${props => props.content}"
  }
`;

const defaultUserAvatarSize = 60;

const UserAvatar = styled.label<IUserAvatar>`
  width: ${props => props.width || defaultUserAvatarSize}px;
  height: ${props => props.height || defaultUserAvatarSize}px;
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
  userLogo: {
    marginRight: '120px',
  },
  header: {
    justifyContent: 'space-around',
    width: '100%',
  },
  // profileIcon: {
  //   marginLeft: '4px',
  // },
  rowWrapper: {
    padding: '36px 0 22px 0',
    left: '12px',
  },
  penImg: {
    cursor: 'pointer',
    marginLeft: '12px',
  },
  profileDataColumnWrapper: {
    displayFlag: true,
    position: 'relative',
    margin: '0 12px 0 8px',
    justifyContent: 'center',
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

const checkUserName = (nameLength: number) =>
  nameLength >= minNameLength && nameLength <= maxUserNameLength;

export const AuthorizedProfile: React.FC<IAuthorizedProfile> = ({
  openPopUpState,
}) => {
  const {
    worldName,
    money,
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
    localName !== name && setLocalName(name);
    birthdayDate !== birthday && setBirthdayDate(birthday);
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

  const onSubmitHandler = async (e?: FormEvent) => {
    e && e.preventDefault();
    if (checkUserName(localName.length)) {
      await updateUserData({ birthday: birthdayDate, name: localName });
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
      <RowWrapper style={styledConfig.header}>
        <RowWrapper style={styledConfig.userLogo}>
          <UserAvatar avatar={avatar}>
            {/* <input type="file" accept="image/jpeg,image/png,image/svg" /> */}
          </UserAvatar>
          <ColumnWrapper {...styledConfig.profileDataColumnWrapper}>
            <NickNameWrapper content={name} />
            {/*<ProgressBar /> */}
          </ColumnWrapper>
        </RowWrapper>
        <CoinsWallet sum={String(money)} />
      </RowWrapper>
      <RowWrapper {...styledConfig.rowWrapper}>
        <WorldTitle
          onClick={() => setOpenPopUpState(TypesOfPopUps.EDIT_WORLD_NAME)}
        >
          {worldName}
          <img src={penImg} alt="pen" style={styledConfig.penImg} />
        </WorldTitle>
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
            style={{ marginRight: '16px' }}
            value={birthdayParser(birthdayDate.dd)}
            onChangeCallback={el =>
              setBirthdayDate(prevState => ({ dd: el, mm: prevState.mm }))
            }
          />
          <Dropdown
            options={MonthsStringArr}
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
  marginRight?: number;
}

interface IAuthorizedProfile {
  openPopUpState: TypesOfPopUps;
}

interface IPopUpConfig {
  [key: string]: IPopUp;
}

export interface IUserAvatar {
  avatar?: string | null;
  width?: number;
  height?: number;
}

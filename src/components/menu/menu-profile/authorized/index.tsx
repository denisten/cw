import React, { FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import penImg from '../not-authorized/pen.svg';
import { useStore } from 'effector-react';
import userAvatarIcon from './user-avatar.svg';
import camera from './camera.svg';
import { StyledSpan } from '../../../../UI/span';
import { MTSSans } from '../../../../fonts';
import {
  maxCityNameLength,
  maxUserNameLength,
  minNameLength,
} from '../../../../constants';
import { IBirthday, UserDataStore } from '../../../../effector/user-data/store';
import { inputValidation } from '../../../../utils/input-validation';
import { RowWrapper } from '../../../../UI/row-wrapper';
import { ColumnWrapper } from '../../../../UI/column-wrapper';
import { updateUserData } from '../../../../utils/update-user-data';
import { CoinsWallet } from '../../../../UI/wallet';
import { IPopUp, PopUp, TypesOfPopUps } from '../../../../UI/pop-up';
import { setOpenPopUpState } from '../../../../effector/app-condition/events';
import { logout } from '../../../../effector/user-data/events';
import { Input } from '../../../../UI/input';
import { Button, ButtonClassNames } from '../../../../UI/button';
import PhoneDropdown from '../../../../UI/phone-dropdown';
import { Options } from '../../../../UI/phone-dropdown/options';

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const ExitText = styled(StyledSpan)<ISpan>`
  font-family: ${MTSSans.REGULAR};
  font-size: 16px;
  color: #02acc8;
  margin-left: 8px;
  &::after {
    content: "${props => props.content}"
  }
`;

const NickNameWrapper = styled(StyledSpan)`
  font-family: ${MTSSans.BOLD};
  font-weight: 900;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.6px;
  color: #001424;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 40px;
  box-sizing: border-box;
`;

const WorldTitle = styled.div`
  font-family: ${MTSSans.BLACK};
  font-size: 24px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.6px;
  text-align: center;
  color: #001424;
  margin-right: 9px;
  cursor: pointer;
  padding: 53px 0 26px 0;
  left: 12px;
`;

const defaultInputTitleMarginRight = 10;

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

const UserAvatar = styled.label<IUserAvatar>`
  width: 60px;
  height: 60px;
  margin: 0 15px 0 4px;
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
  rowWrapper: {
    padding: '53px 0 26px 0',
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
  nameInput: { marginRight: '16px' },
  exitWrapper: {
    margin: '30px 0 0 0',
    cursor: 'pointer',
  },
  nameRowWrapper: {
    alignItems: 'center',
    margin: '0 0 24px 0',
  },
  popUpEditUserNameStyles: {
    width: 487,
    height: 305,
    padding: '76px 79px 0 79px',
  },
};

let nameInputHint = '';

const checkUserName = (nameLength: number) =>
  nameLength >= minNameLength && nameLength <= maxUserNameLength;

const inputLengthErrorParams = { maxSymbol: 14, minSymbol: 3 };

const AuthorizedProfile: React.FC<IAuthorizedProfile> = ({
  openPopUpState,
}) => {
  const {
    worldName,
    money,
    name,
    birthday,
    userSessionSocket,
    avatar,
  } = useStore(UserDataStore);
  const [localName, setLocalName] = useState(name);
  const [birthdayDate, setBirthdayDate] = useState<IBirthday>(birthday);
  const [nameInputHasError, setNameInputHasError] = useState(false);
  const buttonClassName = !nameInputHasError
    ? ButtonClassNames.NORMAL
    : ButtonClassNames.DISABLED;

  useEffect(() => {
    localName !== name && setLocalName(name);
    birthdayDate !== birthday && setBirthdayDate(birthday);
  }, [name, birthday]);

  const handleChangeNameInput = (value: string) => {
    nameInputHint = inputValidation(
      value,
      nameInputHint,
      setNameInputHasError,
      inputLengthErrorParams
    );
    setLocalName(value);
  };

  const onSubmitHandler = async (e?: FormEvent) => {
    e && e.preventDefault();
    if (nameInputHasError) return;
    if (checkUserName(localName.length)) {
      await updateUserData({ birthday: birthdayDate, name: localName });
    } else {
      setNameInputHasError(true);
    }
  };

  const handleExitButtonClick = async () => {
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
  };

  const openPopUp = () => setOpenPopUpState(TypesOfPopUps.EDIT_WORLD_NAME);

  return (
    <Wrapper>
      <PopUp
        {...popUpConfig[openPopUpState]}
        displayFlag={openPopUpState !== TypesOfPopUps.DISABLED}
      />
      <Header>
        <RowWrapper style={styledConfig.userLogo}>
          <UserAvatar avatar={avatar} />
          <ColumnWrapper {...styledConfig.profileDataColumnWrapper}>
            <NickNameWrapper>{name}</NickNameWrapper>
            <PhoneDropdown phone="+7 962 918 02 32" />
          </ColumnWrapper>
        </RowWrapper>
        <CoinsWallet sum={String(money)} />
      </Header>
      <WorldTitle onClick={openPopUp}>
        {worldName}
        <img src={penImg} alt="pen" style={styledConfig.penImg} />
      </WorldTitle>
      <RowWrapper {...styledConfig.nameRowWrapper}>
        <InputTitle content="Никнейм" />
        <Input
          value={localName}
          onSubmitHandler={onSubmitHandler}
          onChangeHandler={e => handleChangeNameInput(e.target.value)}
          style={styledConfig.nameInput}
          hasError={nameInputHasError}
          hint={nameInputHint}
        />
      </RowWrapper>
      <Button
        className={buttonClassName}
        content="Сохранить"
        callback={onSubmitHandler}
      />
      <ExitText
        content="Выйти"
        onClick={handleExitButtonClick}
        style={styledConfig.exitWrapper}
      />
    </Wrapper>
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

export default AuthorizedProfile;

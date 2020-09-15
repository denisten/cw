import React from 'react';
import { IPopUp, PopUp } from '../../../../UI/pop-up';
import { RowWrapper } from '../../../../UI/row-wrapper';
import { reactGAEvent } from '../../../../utils/ga-event';
import { ColumnWrapper } from '../../../../UI/column-wrapper';
import PhoneDropdown from '../../../../UI/phone-dropdown';
import { CoinsWallet } from '../../../../UI/wallet';
import penImg from '../not-authorized/pen.svg';
import { Input } from '../../../../UI/input';
import { Button, ButtonClassNames } from '../../../../UI/button';
import { IUserAvatar } from './index';
import styled from 'styled-components';
import { StyledSpan } from '../../../../UI/span';
import { MTSSans } from '../../../../fonts';
import userAvatarIcon from './user-avatar.svg';
import camera from './camera.svg';

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const NickNameWrapper = styled(StyledSpan)`
  font-family: ${MTSSans.BOLD};
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

export const popUpEditUserNameStyles = {
  width: 487,
  height: 305,
  padding: '76px 79px 0 79px',
};

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
  nameRowWrapper: {
    alignItems: 'center',
    margin: '0 0 24px 0',
  },
  popUpEditUserNameStyles: popUpEditUserNameStyles,
};

export const AuthorizedLayout: React.FC<IAuthorizedLayout> = props => {
  return (
    <Wrapper>
      <PopUp {...props.popUpConfig} />
      <Header>
        <RowWrapper style={styledConfig.userLogo}>
          <UserAvatar
            avatar={props.avatar}
            onClick={() =>
              reactGAEvent({
                eventLabel: 'foto',
                eventCategory: 'profile',
              })
            }
          />
          <ColumnWrapper {...styledConfig.profileDataColumnWrapper}>
            <NickNameWrapper>{name}</NickNameWrapper>
            <PhoneDropdown phone={props.msisdn} />
          </ColumnWrapper>
        </RowWrapper>
        <CoinsWallet sum={String(props.money)} />
      </Header>
      <WorldTitle onClick={props.openPopUp}>
        {props.worldName}
        <img src={penImg} alt="pen" style={styledConfig.penImg} />
      </WorldTitle>
      <RowWrapper {...styledConfig.nameRowWrapper}>
        <InputTitle content="Никнейм" />
        <Input
          value={props.localName}
          onSubmitHandler={props.onSubmitHandler}
          onChangeHandler={e => props.handleChangeNameInput(e.target.value)}
          style={styledConfig.nameInput}
          hasError={props.nameInputHasError}
          hint={props.nameInputHint}
        />
      </RowWrapper>
      <Button
        className={props.buttonClassName}
        content="Сохранить"
        callback={props.onSubmitHandler}
      />
    </Wrapper>
  );
};

interface IAuthorizedLayout {
  popUpConfig: IPopUp;
  avatar: string | null;
  msisdn: string | null;
  money: number;
  openPopUp: () => void;
  worldName: string;
  localName: string;
  onSubmitHandler: () => void;
  handleChangeNameInput: Function;
  nameInputHasError: boolean;
  nameInputHint: string;
  buttonClassName: ButtonClassNames;
}

interface ISpan {
  content?: string;
  marginRight?: number;
}

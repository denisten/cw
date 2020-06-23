import React, { memo, useState } from 'react';
import styled from 'styled-components';
import alarmImg from './alarm.svg';
import { MTSSans } from '../../fonts';
import { useStore } from 'effector-react';
import { Button, ButtonClassNames } from '../../UI/button';
import { PopUpContentWrapper } from '../../UI/pop-up-content-wrapper';
import { maxPercent } from '../markers/timer';
import { AppCondition } from '../../effector/app-condition/store';
import { handleAuthButtonClick } from '../../utils/handle-auth-button-click';
import { nextTutorStep } from '../../effector/tutorial-store/events';
import { logout, resetUserDataStore } from '../../effector/user-data/events';
import { UserDataStore } from '../../effector/user-data/store';

const Title = styled.div`
  font-family: ${MTSSans.MEDIUM};
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 24px;

  text-align: center;
  letter-spacing: -0.5px;

  color: #001424;
  span {
    color: #02adc9;
  }

  &.alternative {
    font-size: 14px;
    line-height: 20px;
    color: #02adc9;
    cursor: pointer;
  }
`;

const AlarmWrapper = styled.div<IDisplayFlag>`
  display: flex;
  opacity: ${props => (props.displayFlag ? maxPercent : 0)};
  justify-content: space-evenly;
  align-items: center;
  border: 2px dashed #979797;
  box-sizing: border-box;
  border-radius: 10px;
  height: 66px;
  width: 330px;
  margin-bottom: 13px;
  span {
    font-family: ${MTSSans.REGULAR};
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    color: #979797;
    width: 246px;
    height: 40px;
  }
`;

const styledConfig = {
  title: { marginBottom: '12px' },
  button: { marginBottom: '20px' },
};

const buttonContent = (createNewWorld: boolean, isAuthorized: boolean) => {
  if (!createNewWorld) {
    if (isAuthorized) {
      return 'Продолжить';
    } else {
      return 'Войти';
    }
  } else {
    return 'Нет, я передумал';
  }
};

const titleContent = (
  createNewWorld: boolean,
  isAuthorized: boolean,
  name: string
) => {
  if (!createNewWorld) {
    if (isAuthorized) {
      return <AuthTitle name={name} />;
    } else {
      return 'Авторизация';
    }
  } else {
    return 'Создать новый город';
  }
};

const AuthTitle: React.FC<{ name: string }> = ({ name }) => (
  <>
    Продолжить как, <span>{name}</span>
  </>
);

const Alarm: React.FC<IDisplayFlag> = ({ displayFlag }) => (
  <AlarmWrapper displayFlag={displayFlag}>
    <img src={alarmImg} alt="alarm" />
    <span>Если вы создадите новый город, вы потеряете весь прогресс!</span>
  </AlarmWrapper>
);

export const SkipTutorial: React.FC<ISkipTutorial> = memo(
  ({ displayFlag, setDisplayFlag }) => {
    const { isAuthorized } = useStore(AppCondition);
    const [createNewWorld, setCreateNewWorld] = useState(false);
    const { name } = useStore(UserDataStore);

    const handleClickCreateNewWorld = async () => {
      if (createNewWorld) {
        await logout('');
        resetUserDataStore();
        nextTutorStep();
        setDisplayFlag();
      } else {
        setCreateNewWorld(!createNewWorld);
      }
    };

    const handleClick = () => {
      if (isAuthorized) {
        if (createNewWorld) {
          setCreateNewWorld(false);
        } else {
          setDisplayFlag();
        }
      } else {
        if (createNewWorld) {
          setCreateNewWorld(false);
        } else {
          handleAuthButtonClick();
          setDisplayFlag();
        }
      }
    };

    return (
      <PopUpContentWrapper displayFlag={displayFlag}>
        <Title style={styledConfig.title}>
          {titleContent(createNewWorld, isAuthorized, name)}
        </Title>
        <Alarm displayFlag={createNewWorld} />
        <Button
          style={styledConfig.button}
          className={ButtonClassNames.NORMAL}
          callback={handleClick}
          content={buttonContent(createNewWorld, isAuthorized)}
        />
        <Title className="alternative" onClick={handleClickCreateNewWorld}>
          Создать новый город
        </Title>
      </PopUpContentWrapper>
    );
  }
);

export interface IDisplayFlag {
  displayFlag: boolean;
}

interface ISkipTutorial {
  displayFlag: boolean;
  setDisplayFlag: Function;
}

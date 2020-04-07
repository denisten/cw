import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import popUpWrapperBackground from './pop-up-background.svg';
import { Overlay } from '../overlay';
import { StyledSpan } from '../span';
import { MTSSans } from '../../fonts';
import { Input } from '../input';
import { Button, ButtonClassNames } from '../button';
import { editUserData } from '../../effector/user-data/events';
import { UserDataStoreKeys } from '../../effector/user-data/store';

const PopUpWrapper = styled.div`
  background-image: url(${popUpWrapperBackground});
  background-size: cover;
  position: absolute;
  width: 487px;
  height: 305px;
  box-shadow: 0 5px 12px 0 rgba(26, 29, 34, 0.2);
  padding: 76px 79px 0 79px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Title = styled(StyledSpan)`
  font-family: ${MTSSans.BLACK};
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: -0.5px;
  text-align: center;
  color: #001424;
  margin-bottom: 24px;
}`;

const styleConfig = {
  input: {
    marginBottom: '40px',
  } as React.CSSProperties,
};

export const PopUp: React.FC<IPopUp> = ({ callback, displayFlag }) => {
  const [value, setValue] = useState('');

  const saveData = () => {
    editUserData({ key: UserDataStoreKeys.WORLD_NAME, value });
    callback();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveData();
  };

  return (
    <Fragment>
      {displayFlag ? (
        <Overlay displayFlag={true}>
          <PopUpWrapper>
            <Title>Введите название города</Title>
            <Input
              style={styleConfig.input}
              onChangeHandler={e => setValue(e.target.value)}
              onSubmitHandler={handleSubmit}
              value={value}
              // title="Имя"
            />
            <Button
              className={ButtonClassNames.NORMAL}
              content="Сохранить"
              callback={saveData}
            />
          </PopUpWrapper>
        </Overlay>
      ) : null}
    </Fragment>
  );
};

interface IPopUp {
  callback: () => void;
  displayFlag: boolean;
}

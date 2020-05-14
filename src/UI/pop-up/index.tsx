import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import popUpWrapperBackground from './pop-up-background.svg';
import { Overlay } from '../overlay';
import { StyledSpan } from '../span';
import { MTSSans } from '../../fonts';
import { Input } from '../input';
import { Button, ButtonClassNames } from '../button';
import { editCurrentUserDataField } from '../../effector/user-data/events';
import {
  UserDataStore,
  UserDataStoreKeys,
} from '../../effector/user-data/store';
import {
  maxNameLength,
  minNameLength,
} from '../../components/profile/authorized';
import { useStore } from 'effector-react';
import {
  TutorialConditions,
  TutorialStore,
} from '../../effector/tutorial-store/store';
import { nextTutorStep } from '../../effector/tutorial-store/events';
import { menuClosed } from '../../effector/app-condition/events';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';
import { ExitButton } from '../exit-button';
import {
  TutorialOverlay,
  TutorialOverlayTopLayer,
} from '../../components/tutorial-overlay';
import { zIndexForInheritOverlay } from '../../constants';

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
`;

const styleConfig = {
  button: {
    position: 'static',
    margin: '45px 0 0 0',
  } as React.CSSProperties,
  overlay: {
    zIndex: ZIndexes.UI_BUTTON + 1,
  },
  exitButton: {
    top: '0',
    right: '0',
  },
  input: {
    padding: '0 0 0 16px',
    background: 'white',
  },
};

let worldInputHint = '';
export const minSymbolsAlert = 'Минимальное число символов ';
export const maxSymbolsAlert = 'Максимальное число символов ';

export const PopUp: React.FC<IPopUp> = ({ callback, displayFlag }) => {
  const { worldName } = useStore(UserDataStore);
  const { tutorialCondition } = useStore(TutorialStore);
  const [value, setValue] = useState(worldName);
  const [inputHasError, setInputHasError] = useState(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(e.target.value);
    if (value.length < minNameLength) {
      worldInputHint = minSymbolsAlert + minNameLength;
      setInputHasError(true);
    } else if (value.length > maxNameLength) {
      worldInputHint = maxSymbolsAlert + maxNameLength;
      setInputHasError(true);
    } else {
      setInputHasError(false);
    }
  };
  const saveData = () => {
    editCurrentUserDataField({ key: UserDataStoreKeys.WORLD_NAME, value });
    callback();
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (value.length >= minNameLength && value.length <= maxNameLength) {
      saveData();
      if (
        tutorialCondition === TutorialConditions.PULSE_SAVE_CHANGE_CITY_NAME
      ) {
        nextTutorStep();
        menuClosed();
      }
    } else {
      setInputHasError(true);
    }
  };

  return (
    <Fragment>
      {displayFlag ? (
        <Overlay displayFlag={true} style={styleConfig.overlay}>
          <PopUpWrapper>
            <ExitButton callBack={callback} {...styleConfig.exitButton} />
            <Title>Введите название города</Title>
            <TutorialOverlayTopLayer
              zIndex={
                tutorialCondition ===
                TutorialConditions.PULSE_SAVE_CHANGE_CITY_NAME
                  ? zIndexForInheritOverlay + 1
                  : zIndexForInheritOverlay - 1
              }
            >
              <Input
                onChangeHandler={handleOnChange}
                onSubmitHandler={handleSubmit}
                value={value}
                hasError={inputHasError}
                hint={worldInputHint}
                style={styleConfig.input}
              />
            </TutorialOverlayTopLayer>
            <TutorialOverlayTopLayer
              zIndex={
                tutorialCondition ===
                TutorialConditions.PULSE_SAVE_CHANGE_CITY_NAME
                  ? zIndexForInheritOverlay + 1
                  : zIndexForInheritOverlay - 1
              }
            >
              <Button
                style={styleConfig.button}
                className={ButtonClassNames.NORMAL}
                content="Сохранить"
                callback={handleSubmit}
                animFlag={
                  tutorialCondition ===
                  TutorialConditions.PULSE_SAVE_CHANGE_CITY_NAME
                }
              />
            </TutorialOverlayTopLayer>
          </PopUpWrapper>
          <TutorialOverlay
            displayFlag={
              tutorialCondition ===
              TutorialConditions.PULSE_SAVE_CHANGE_CITY_NAME
            }
            zIndex={zIndexForInheritOverlay}
          ></TutorialOverlay>
        </Overlay>
      ) : null}
    </Fragment>
  );
};

interface IPopUp {
  callback: () => void;
  displayFlag: boolean;
}

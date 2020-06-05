import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import popUpWrapperBackground from './pop-up-background.svg';
import { Overlay } from '../overlay';
import { StyledSpan } from '../span';
import { MTSSans } from '../../fonts';
import { Input } from '../input';
import { Button, ButtonClassNames } from '../button';
import { editCurrentUserDataField } from '../../effector/user-data/events';
import { UserDataStoreKeys } from '../../effector/user-data/store';
import {
  minNameLength,
  maxUserNameLength,
  TypesOfPopUps,
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
import { saveUserData } from '../../api/save-user-data';
import { contains } from '../../utils/check-include';
import supportSprite from '../../img/assistant/assistant.png';
import { Sprite } from '../../components/sprite';
const statusOk = 200;
const PopUpWrapper = styled.div<IPopUpStyles>`
  background-image: url(${popUpWrapperBackground});
  background-size: cover;
  position: absolute;
  width: ${props => props.width};
  height: ${props => props.height};
  box-shadow: 0 5px 12px 0 rgba(26, 29, 34, 0.2);
  padding: ${props => props.padding};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: ${props => props.flexDirection};
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

const AssistantSprite = styled.div`
  position: absolute;
  width: 188px;
  height: 264px;
  left: 30px;
  top: 27px;
`;

const styleConfig = {
  button: {
    position: 'relative',
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
  sprite: {
    canvasWidth: 224,
    canvasHeight: 304,
    numberOfFramesX: 10,
    numberOfFramesY: 9,
    ticksPerFrame: 2,

    style: {
      width: '100%',
      height: '100%',
    } as React.CSSProperties,
  },
};

let worldInputHint = '';
export const minSymbolsAlert = 'Минимальное число символов ';
export const maxSymbolsAlert = 'Максимальное число символов ';
export const spaceSymbolsAlert = 'Имена с пробелом недоступны ';

export const PopUp: React.FC<IPopUp> = ({
  callback,
  displayFlag,
  popUpStyles,
  title,
  initValue,
  popUpType = TypesOfPopUps.EDIT_WORLD_NAME,
  maxInputValueLenght = maxUserNameLength,
}) => {
  const { tutorialCondition } = useStore(TutorialStore);
  const [value, setValue] = useState(initValue || '');
  const [inputHasError, setInputHasError] = useState(false);
  const valuesArr = value.split(' ');
  useEffect(() => {
    if (initValue) {
      setValue(initValue);
      setInputHasError(false);
    }
  }, [initValue]);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setValue(e.target.value);
    if (value.length < minNameLength) {
      worldInputHint = minSymbolsAlert + minNameLength;
      setInputHasError(true);
    } else if (value.length > maxInputValueLenght) {
      worldInputHint = maxSymbolsAlert + maxInputValueLenght;
      setInputHasError(true);
    } else if (contains(value, ' ')) {
      worldInputHint = spaceSymbolsAlert;
      setInputHasError(true);
    } else {
      setInputHasError(false);
    }
  };
  const saveData = async () => {
    if (popUpType === TypesOfPopUps.EDIT_WORLD_NAME) {
      const { status } = await saveUserData({ worldName: value });
      if (status === statusOk) {
        editCurrentUserDataField({ key: UserDataStoreKeys.WORLD_NAME, value });
      }
    } else if (popUpType === TypesOfPopUps.EDIT_ASSISTANT_NAME) {
      const { status } = await saveUserData({ assistantName: value });
      if (status === statusOk) {
        editCurrentUserDataField({
          key: UserDataStoreKeys.ASSISTANT_NAME,
          value,
        });
      }
    }

    callback && callback();
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (
      value.length >= minNameLength &&
      value.length <= maxInputValueLenght &&
      valuesArr.length === 1
    ) {
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
          <PopUpWrapper {...popUpStyles}>
            <ExitButton callBack={callback} {...styleConfig.exitButton} />
            <Title>{title}</Title>
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
                describer={'Максимальное число символов ' + maxInputValueLenght}
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
            {popUpType === 'editAssistantName' ? (
              <AssistantSprite>
                <Sprite img={supportSprite} {...styleConfig.sprite} />
              </AssistantSprite>
            ) : null}
          </PopUpWrapper>
          <TutorialOverlay
            displayFlag={
              tutorialCondition ===
              TutorialConditions.PULSE_SAVE_CHANGE_CITY_NAME
            }
            zIndex={zIndexForInheritOverlay}
          />
        </Overlay>
      ) : null}
    </Fragment>
  );
};

export interface IPopUp {
  callback?: () => void;
  displayFlag: boolean;
  popUpStyles?: IPopUpStyles;
  title?: string;
  initValue?: string;
  popUpType?: TypesOfPopUps;
  maxInputValueLenght?: number;
}

interface IPopUpStyles {
  width?: string;
  height?: string;
  padding?: string;
  flexDirection?: string;
}

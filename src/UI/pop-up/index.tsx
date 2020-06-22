import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import { StyledSpan } from '../span';
import { MTSSans } from '../../fonts';
import { Input } from '../input';
import { Button, ButtonClassNames } from '../button';
import { editCurrentUserDataField } from '../../effector/user-data/events';
import { UserDataStoreKeys } from '../../effector/user-data/store';

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
import {
  zIndexForInheritOverlay,
  maxCityNameLength,
  minNameLength,
  statusOk,
} from '../../constants';
import { saveUserData } from '../../api/save-user-data';
import { contains } from '../../utils/check-include';
import supportSprite from '../../img/assistant/assistant.png';
import { Sprite } from '../../components/sprite';
import { PopUpContentWrapper } from '../pop-up-content-wrapper';
import { IDisplayFlag } from '../../components/skip-tutorial';
import { AppCondition } from '../../effector/app-condition/store';

const Title = styled(StyledSpan)`
  font-family: ${MTSSans.BLACK};
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: -0.5px;
  text-align: center;
  color: #001424;
  margin-bottom: 24px;
`;

const AssistantSprite = styled.div<IDisplayFlag>`
  display: ${props => (props.displayFlag ? 'block' : 'none')};
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
    displayFlag: true,
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

export enum TypesOfPopUps {
  EDIT_WORLD_NAME = 'editWorldName',
  EDIT_ASSISTANT_NAME = 'editAssistantName',
  DISABLED = 'disabled',
}

const tutorialDesiredState = (tutorialCondition: TutorialConditions) => {
  return tutorialCondition === TutorialConditions.PULSE_SAVE_CHANGE_CITY_NAME;
};

export const PopUp: React.FC<IPopUp> = ({
  callback,
  displayFlag,
  popUpStyles,
  title,
  initValue,
  popUpType = TypesOfPopUps.EDIT_WORLD_NAME,
  maxInputValueLength = maxCityNameLength,
}) => {
  const { tutorialCondition } = useStore(TutorialStore);
  const { isAuthorized } = useStore(AppCondition);
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
    } else if (value.length > maxInputValueLength) {
      worldInputHint = maxSymbolsAlert + maxInputValueLength;
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
      if (isAuthorized) {
        const { status } = await saveUserData({ worldName: value });
        if (status === statusOk) {
          editCurrentUserDataField({
            key: UserDataStoreKeys.WORLD_NAME,
            value,
          });
        }
      } else {
        editCurrentUserDataField({ key: UserDataStoreKeys.WORLD_NAME, value });
        localStorage.setItem(UserDataStoreKeys.WORLD_NAME, value);
      }
    } else if (popUpType === TypesOfPopUps.EDIT_ASSISTANT_NAME) {
      if (isAuthorized) {
        const { status } = await saveUserData({ assistantName: value });
        if (status === statusOk) {
          editCurrentUserDataField({
            key: UserDataStoreKeys.ASSISTANT_NAME,
            value,
          });
        }
      } else {
        editCurrentUserDataField({
          key: UserDataStoreKeys.ASSISTANT_NAME,
          value,
        });
      }
    }

    callback && callback();
  };

  const popUpHandlerInTutorialMode = () => {
    nextTutorStep();
    menuClosed();
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (
      value.length >= minNameLength &&
      value.length <= maxInputValueLength &&
      valuesArr.length === 1
    ) {
      if (tutorialDesiredState(tutorialCondition)) {
        popUpHandlerInTutorialMode();
      }
      saveData();
    } else {
      setInputHasError(true);
    }
  };

  return (
    <Fragment>
      <PopUpContentWrapper displayFlag={displayFlag} {...popUpStyles}>
        <ExitButton callBack={callback} {...styleConfig.exitButton} />
        <Title>{title}</Title>
        <TutorialOverlayTopLayer
          zIndex={
            tutorialDesiredState(tutorialCondition)
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
            describer={'Максимальное число символов ' + maxInputValueLength}
          />
        </TutorialOverlayTopLayer>
        <TutorialOverlayTopLayer
          zIndex={
            tutorialDesiredState(tutorialCondition)
              ? zIndexForInheritOverlay + 1
              : zIndexForInheritOverlay - 1
          }
        >
          <Button
            style={styleConfig.button}
            className={ButtonClassNames.NORMAL}
            content="Сохранить"
            pulseAnimFlag={tutorialDesiredState(tutorialCondition)}
            callback={handleSubmit}
          />
        </TutorialOverlayTopLayer>
        <AssistantSprite
          displayFlag={popUpType === TypesOfPopUps.EDIT_ASSISTANT_NAME}
        >
          <Sprite img={supportSprite} {...styleConfig.sprite} />
        </AssistantSprite>
        <TutorialOverlay
          displayFlag={tutorialDesiredState(tutorialCondition)}
          zIndex={zIndexForInheritOverlay}
        />
      </PopUpContentWrapper>
    </Fragment>
  );
};

export interface IPopUp {
  callback?: () => void;
  displayFlag?: boolean;
  popUpStyles: IPopUpStyles;
  title?: string;
  initValue?: string;
  popUpType?: TypesOfPopUps;
  maxInputValueLength?: number;
}

export interface IPopUpStyles {
  width?: number;
  height?: number;
  padding?: string;
}

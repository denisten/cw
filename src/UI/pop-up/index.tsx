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
import { ZIndexes } from '../../components/root-component/z-indexes-enum';
import { ExitButton } from '../exit-button';

import { maxCityNameLength, statusOk } from '../../constants';
import { saveUserData } from '../../api/save-user-data';
import supportSprite from '../../img/assistant/assistant.png';
import { Sprite } from '../../components/sprite';
import { PopUpContentWrapper } from '../pop-up-content-wrapper';
import { AppConditionStore } from '../../effector/app-condition/store';
import { inputValidation } from '../../utils/input-validation';
import { menuClosed } from '../../effector/menu-store/events';
import { reactGAEvent } from '../../utils/ga-event';
import { IDisplayFlag } from '../../components/root-component';

export const PopUpTitle = styled(StyledSpan)`
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
    right: '-20px',
    displayFlag: true,
  },
  input: {
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
export const haveSymbolsAlert = 'Символы недоступны';

export enum TypesOfPopUps {
  EDIT_WORLD_NAME = 'editWorldName',
  EDIT_ASSISTANT_NAME = 'editAssistantName',
  DISABLED = 'disabled',
}

const tutorialDesiredState = (tutorialCondition: TutorialConditions) => {
  return tutorialCondition === TutorialConditions.PULSE_SAVE_CHANGE_CITY_NAME;
};
const inputErrorParams = { minSymbol: 3, noSymbols: true };
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
  const { isAuthorized } = useStore(AppConditionStore);
  const [value, setValue] = useState(initValue || '');
  const [inputHasError, setInputHasError] = useState(false);

  useEffect(() => {
    if (initValue) {
      setValue(initValue);
      setInputHasError(false);
    }
  }, [initValue]);

  useEffect(() => {
    if (
      displayFlag &&
      popUpType === TypesOfPopUps.EDIT_WORLD_NAME &&
      !tutorialCondition
    ) {
      reactGAEvent({
        eventLabel: 'city_name',
        eventCategory: 'profile',
      });
    }
  }, [displayFlag]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    worldInputHint = inputValidation(value, worldInputHint, setInputHasError, {
      ...inputErrorParams,
      maxSymbol: maxInputValueLength,
    });
    setValue(e.target.value);
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
    if (inputHasError) return;
    if (tutorialDesiredState(tutorialCondition)) {
      popUpHandlerInTutorialMode();
      reactGAEvent({
        eventLabel: 'city_name',
        eventCategory: 'onboarding',
        eventAction: 'confirmed',
        eventContext: 'step6',
      });
      return;
    }
    reactGAEvent({
      eventLabel: 'city_name',
      eventCategory: 'profile',
      eventAction: 'confirmed',
    });
    saveData();
  };

  return (
    <Fragment>
      <PopUpContentWrapper displayFlag={displayFlag} {...popUpStyles}>
        {!tutorialCondition && (
          <ExitButton callBack={callback} {...styleConfig.exitButton} />
        )}
        <PopUpTitle>{title}</PopUpTitle>
        <Input
          onChangeHandler={handleOnChange}
          onSubmitHandler={handleSubmit}
          value={value}
          hasError={inputHasError}
          hint={worldInputHint}
          style={styleConfig.input}
          describer={'Максимальное число символов ' + maxInputValueLength}
        />

        <Button
          style={styleConfig.button}
          className={
            !inputHasError ? ButtonClassNames.NORMAL : ButtonClassNames.DISABLED
          }
          content="Сохранить"
          pulseAnimFlag={tutorialDesiredState(tutorialCondition)}
          callback={handleSubmit}
        />

        <AssistantSprite
          displayFlag={popUpType === TypesOfPopUps.EDIT_ASSISTANT_NAME}
        >
          <Sprite img={supportSprite} {...styleConfig.sprite} />
        </AssistantSprite>
      </PopUpContentWrapper>
    </Fragment>
  );
};

interface IPopUp {
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
  justifyContent?: string;
  alignItems?: string;
}

import React, { FormEvent, useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { UserDataStore } from '../../../../effector/user-data/store';
import { inputValidation } from '../../../../utils/input-validation';
import { updateUserData } from '../../../../utils/update-user-data';
import { TypesOfPopUps } from '../../../../UI/pop-up';
import { setOpenPopUpState } from '../../../../effector/app-condition/events';
import { ButtonClassNames } from '../../../../UI/button';
import { reactGAEvent } from '../../../../utils/ga-event';
import { AuthorizedLayout, popUpEditUserNameStyles } from './layout';
import { AppConditionStore } from '../../../../effector/app-condition/store';

let nameInputHint = '';

export const maxCityNameLength = 12;
const nameInputParams = {
  maxSymbols: 25,
  minSymbols: 3,
  noSymbols: false,
};

const checkUserName = (name: string) =>
  name.length >= nameInputParams.minSymbols &&
  name.length <= nameInputParams.maxSymbols;

const checkButtonClassName = (nameInputHasError: boolean) =>
  !nameInputHasError ? ButtonClassNames.NORMAL : ButtonClassNames.DISABLED;

export const AuthorizedProfile = () => {
  const { worldName, money, name, avatar, msisdn } = useStore(UserDataStore);
  const { openPopUpState } = useStore(AppConditionStore);

  const [localName, setLocalName] = useState(name);
  const [nameInputHasError, setNameInputHasError] = useState(false);

  const buttonClassName = checkButtonClassName(nameInputHasError);

  const handleChangeNameInput = (value: string) => {
    nameInputHint = inputValidation(
      value,
      nameInputHint,
      setNameInputHasError,
      nameInputParams
    );
    setLocalName(value);
  };

  const onSubmitHandler = async (e?: FormEvent) => {
    e && e.preventDefault();
    if (nameInputHasError) return;
    if (checkUserName(localName)) {
      await updateUserData(localName);
    } else {
      setNameInputHasError(true);
    }
    reactGAEvent({
      eventLabel: 'sohranit',
      eventCategory: 'profile',
      eventAction: 'button_click',
    });
  };

  const popUpConfig = {
    callback: () => setOpenPopUpState(TypesOfPopUps.DISABLED),
    popUpStyles: popUpEditUserNameStyles,
    title: 'Введите название города',
    initValue: worldName,
    maxInputValueLength: maxCityNameLength,
    displayFlag: openPopUpState !== TypesOfPopUps.DISABLED,
  };

  const openPopUp = () => setOpenPopUpState(TypesOfPopUps.EDIT_WORLD_NAME);

  useEffect(() => {
    localName !== name && setLocalName(name);
  }, [name]);

  return (
    <AuthorizedLayout
      popUpConfig={popUpConfig}
      avatar={avatar}
      msisdn={msisdn}
      money={money}
      openPopUp={openPopUp}
      worldName={worldName}
      localName={localName}
      onSubmitHandler={onSubmitHandler}
      handleChangeNameInput={handleChangeNameInput}
      nameInputHasError={nameInputHasError}
      nameInputHint={nameInputHint}
      buttonClassName={buttonClassName}
    />
  );
};

export interface IUserAvatar {
  avatar?: string | null;
  width?: number;
  height?: number;
}

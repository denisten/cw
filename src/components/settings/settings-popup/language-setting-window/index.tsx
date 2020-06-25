import React from 'react';
import {
  LanguageType,
  ISettingStore,
  SettingsType,
} from '../../../../effector/settings/store';
import styled from 'styled-components';
import { SettingsRow, popUpSettingItemsTranslate } from '..';
import ru from './ru.svg';
import eng from './eng.svg';
import { languageToggle } from '../../../../effector/settings/events';

const LangSettingRow = styled(props => <SettingsRow {...props} />)`
  justify-content: flex-start !important;
  cursor: pointer;

  span {
    color: #202d3d !important;
    margin-left: 8px;
  }
`;

const RadioButton = styled.div<{ active: boolean }>`
  width: 9px;
  height: 9px;
  border: ${props => (props.active ? 'none' : '2px solid #d2ecf0')};
  background-color: ${props => (props.active ? '#02ACC8' : 'none')};
  box-sizing: border-box;
  border-radius: 50%;
  margin-right: 24px;
  transition: 0.2s;
`;

const switchLangIcon = (type: LanguageType) => {
  switch (type) {
    case LanguageType.RU:
      return ru;
    case LanguageType.ENG:
      return eng;
    default:
      break;
  }
};

const Flag = styled.div<{ type: LanguageType }>`
  width: 18px;
  height: 12px;
  background: url(${props => switchLangIcon(props.type)}) no-repeat center;
  background-size: 100% 100%;
`;

export const LanguageSettingWindow: React.FC<ILanguageSettingWindow> = ({
  language,
}) => {
  return (
    <>
      {Object.values(LanguageType).map((langSettingType, ind) => (
        <LangSettingRow
          key={ind}
          onClick={() => languageToggle(langSettingType)}
        >
          <RadioButton active={language === langSettingType} />
          <Flag type={langSettingType} />
          <span>{popUpSettingItemsTranslate[langSettingType]}</span>
        </LangSettingRow>
      ))}
    </>
  );
};

interface ILanguageSettingWindow {
  language: ISettingStore[SettingsType.LANGUAGE];
}

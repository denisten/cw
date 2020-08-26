import React from 'react';
import styled from 'styled-components';
import { SettingItems } from './setting-items';
import { MTSSans } from '../../fonts';

const SettingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const SettingPopUpTitle = styled.div`
  height: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: 'Настройки';
    font-family: ${MTSSans.BOLD};
    font-size: 36px;
    line-height: 24px;

    letter-spacing: -0.6px;

    color: #001424;
  }
`;

const SettingOptionsWrapper = styled.div`
  display: flex;
`;

const SettingFooter = styled.div`
  box-sizing: border-box;
  margin-top: 71px;
  display: flex;
  align-items: center;

  a {
    font-size: 14px;
    line-height: 20px;
    text-decoration-line: underline;
    color: #02adc9;
    margin-right: 30px;
  }
`;

const AllRightsReserved = styled.span`
  font-size: 12px;
  line-height: 20px;
  color: #001424;
  opacity: 0.5;
  margin-top: 15px;
`;

export const Settings: React.FC = () => {
  return (
    <SettingWrapper>
      <SettingPopUpTitle />
      <SettingOptionsWrapper>
        <SettingItems />
      </SettingOptionsWrapper>
      <SettingFooter>
        <a
          target="_blank"
          href="https://moskva.mts.ru/personal"
          rel="noopener noreferrer"
        >
          Условия пользования
        </a>
        <a
          target="_blank"
          href="https://moskva.mts.ru/personal"
          rel="noopener noreferrer"
        >
          Политика конфидециальности
        </a>
        <a
          target="_blank"
          href="https://moskva.mts.ru/personal"
          rel="noopener noreferrer"
        >
          Договор-оферта
        </a>
      </SettingFooter>
      <AllRightsReserved>
        Мир Клиента. Все права защищены. 2020.
      </AllRightsReserved>
    </SettingWrapper>
  );
};

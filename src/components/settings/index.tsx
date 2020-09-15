import React from 'react';
import styled from 'styled-components';
import { SettingItems } from './setting-items';
import { MTSSans } from '../../fonts';
import termsDoc from './terms.pdf';
import { reactGAEvent } from '../../utils/ga-event';
import background from './background.svg';

const SettingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: url(${background}) no-repeat center;
  background-size: 100% 100%;
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
          href={termsDoc}
          rel="noopener noreferrer"
          onClick={() => {
            reactGAEvent({
              eventLabel: 'usloviya_polzovaniya',
              eventCategory: 'nastroiki',
              eventAction: 'link_click',
            });
          }}
        >
          Пользовательское соглашение
        </a>
      </SettingFooter>
      <AllRightsReserved>(С) 2020 ПАО «МТС»</AllRightsReserved>
    </SettingWrapper>
  );
};

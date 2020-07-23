import React from 'react';
import styled from 'styled-components';
import background from './background.svg';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';
import { setOpenEncyclopediaState } from '../../effector/menu-store/events';

const TutorialSliderButtonWrapper = styled.div`
  width: 50px;
  height: 50px;
  background: url(${background}) no-repeat center;
  position: absolute;
  right: 50px;
  bottom: 50px;
  cursor: pointer;
  z-index: ${ZIndexes.UI_BUTTON};
`;

export const TutorialSliderButton = () => {
  return (
    <TutorialSliderButtonWrapper
      onClick={() => setOpenEncyclopediaState(true)}
    />
  );
};

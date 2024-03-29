import React from 'react';
import styled from 'styled-components';
import background from './background.svg';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';
import { setOpenEncyclopediaState } from '../../effector/menu-store/events';
import { useStore } from 'effector-react';
import {
  TutorialStore,
  TutorialConditions,
} from '../../effector/tutorial-store/store';
import { ElementOpacity } from '../../constants';
import { reactGAEvent } from '../../utils/ga-event';

const TutorialSliderButtonWrapper = styled.div<ITutorialSliderButtonWrapper>`
  width: 50px;
  height: 50px;
  background: url(${background}) no-repeat center;
  position: absolute;
  right: 40px;
  bottom: 50px;
  cursor: pointer;
  z-index: ${ZIndexes.UI_BUTTON};
  opacity: ${props =>
    props.disableElem ? ElementOpacity.DISABLE : ElementOpacity.ENABLE};
  pointer-events: ${props => (props.disableElem ? 'none' : 'auto')};
`;

export const TutorialSliderButton = () => {
  const { tutorialCondition } = useStore(TutorialStore);
  const checkPossibilityClick = tutorialCondition !== TutorialConditions.OFF;
  return (
    <TutorialSliderButtonWrapper
      disableElem={checkPossibilityClick}
      onClick={() => {
        reactGAEvent({
          eventLabel: 'instrukciya',
          eventCategory: 'mir',
          buttonLocation: null,
        });
        setOpenEncyclopediaState(true);
      }}
    />
  );
};

interface ITutorialSliderButtonWrapper {
  disableElem: boolean;
}

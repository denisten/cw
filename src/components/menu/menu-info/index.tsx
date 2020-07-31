import React from 'react';
import {
  tutorialSliderContent,
  tutorialSlidesArray,
} from '../../tutorial-slider/init-slider';
import { TutorialSlider } from '../../tutorial-slider';
import { editTutorialSliderDisplayFlag } from '../../../effector/app-condition/events';

export const MenuInfo = () => (
  <TutorialSlider
    imgArray={tutorialSlidesArray}
    callback={() => editTutorialSliderDisplayFlag(false)}
    content={tutorialSliderContent}
    showOverlay={false}
  />
);

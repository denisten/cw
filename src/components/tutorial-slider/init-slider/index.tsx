import React from 'react';
import slider1 from './slider-1.png';
import slider2 from './slider-2.png';
import slider3 from './slider-3.png';
import slider4 from './slider-4.png';
import slider5 from './slider-5.png';
import { TutorialSlider } from '..';
import { editTutorialSliderDisplayFlag } from '../../../effector/app-condition/events';

export const tutorialSlidesArray = [
  slider1,
  slider2,
  slider3,
  slider4,
  slider5,
];
export const tutorialSliderContent = [
  {
    title: 'Выполняйте задания, чтобы развивать город',
    description:
      'Новые задания появляются ежедневно. Выполняйте их, получайте игровую валюту, опыт и многое другое!  ',
  },
  {
    title: 'Тратьте валюту на уникальные предложения!',
    description: 'В магазине можно купить то, что нужно именно вам.',
  },
  {
    title: 'Нажмите на название здания, чтобы познакомиться поближе',
    description: 'Из здания можно перейти прямиком на сайт сервиса',
  },
  {
    title: 'Чем выше уровень здания, тем больше дохода оно генерирует',
    description: 'Улучшайте здания и собирайте больше виртуальных налогов',
  },
  {
    title: 'Играйте и выигрывайте',
    description:
      'В некоторых зданиях можно сыграть в специальные игры. Не упустите шанс!',
  },
];
export const InitTutorialSlider = () => (
  <TutorialSlider
    imgArray={tutorialSlidesArray}
    displayFlag={false}
    callback={() => editTutorialSliderDisplayFlag(false)}
    content={tutorialSliderContent}
  />
);

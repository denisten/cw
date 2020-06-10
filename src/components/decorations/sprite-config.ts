import {
  ISpriteCollectionStyleConfig,
  ISpriteParams,
} from '../sprite-collection';

const commonSpriteSetting = {
  canvasWidth: 99,
  canvasHeight: 147,
  numberOfFramesX: 6,
  numberOfFramesY: 5,
  ticksPerFrame: 4,
  infinity: true,
};

export const fountainConfig: IFountainConfig[] = [
  {
    style: [
      {
        style: {
          top: '39.9%',
          left: '47.71%',
        },
      },
    ],
    setting: {
      ...commonSpriteSetting,
      style: {
        width: 'auto',
        height: 'auto',
      },
    },
  },
  {
    style: [
      {
        style: {
          top: '36.8%',
          left: '31.72%',
        },
      },
      {
        style: {
          top: '47.15%',
          left: '52.37%',
        },
      },
    ],
    setting: {
      ...commonSpriteSetting,
      style: {
        width: '66px',
        height: '101px',
      },
    },
  },
  {
    style: [
      {
        style: {
          top: '35.8%',
          left: '61%',
        },
      },
      {
        style: {
          top: '35.6%',
          left: '61.34%',
        },
      },
      {
        style: {
          top: '35.4%',
          left: '61.67%',
        },
      },
      {
        style: {
          top: '35.15%',
          left: '61.99%',
        },
      },
      {
        style: {
          top: '34.9%',
          left: '62.3%',
        },
      },
    ],
    setting: {
      ...commonSpriteSetting,
      style: {
        width: '29px',
        height: '67px',
      },
    },
  },
];

interface IFountainConfig {
  style: ISpriteCollectionStyleConfig[];
  setting: ISpriteParams;
}

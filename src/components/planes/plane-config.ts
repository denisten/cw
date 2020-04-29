import backgroundLevel0 from './plane_v_1.png';
import backgroundLevel1 from './plane_v_2.png';
import backgroundLevel2 from './plane_v_3.png';

export const planeConfig: IPlaneConfig = {
  level0: [
    {
      top: '25.9%',
      left: '34.3%',
      width: '107px',
      height: '71px',
      backgroundImage: backgroundLevel0,
      id: 0,
    },
    {
      top: '24.5%',
      left: '36.3%',
      width: '107px',
      height: '71px',
      backgroundImage: backgroundLevel0,
      id: 1,
    },
  ],

  level1: [
    {
      top: '24.8%',
      left: '44.3%',
      width: '137px',
      height: '101px',
      backgroundImage: backgroundLevel1,
      id: 0,
    },
    {
      top: '15.9%',
      left: '44.1%',
      width: '137px',
      height: '101px',
      backgroundImage: backgroundLevel1,
      id: 1,
    },
  ],
  level2: [
    {
      top: '24.7%',
      left: '34.3%',
      width: '207px',
      height: '124px',
      backgroundImage: backgroundLevel2,
      id: 0,
    },
    {
      top: '22.8%',
      left: '37.1%',
      width: '207px',
      height: '124px',
      backgroundImage: backgroundLevel2,
      id: 1,
    },
  ],
};

interface IPlaneConfig {
  [key: string]: Array<IPlaneItem>;
}

export interface IPlaneItem {
  top?: string;
  left?: string;
  width?: string;
  height?: string;
  backgroundImage?: string;
  id?: number;
}

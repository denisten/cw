import backgroundLevel0 from './plane_v_1.png';
import backgroundLevel1 from './plane_v_2.png';
import backgroundLevel2 from './plane_v_3.png';

export const planeConfig: IPlaneConfig = {
  level1: [
    {
      top: '24.3%',
      left: '35.3%',
      width: '107px',
      height: '71px',
      backgroundImage: backgroundLevel0,
      id: 0,
    },
    {
      top: '21.7%',
      left: '37.4%',
      width: '107px',
      height: '71px',
      backgroundImage: backgroundLevel0,
      id: 1,
    },
  ],

  level2: [
    {
      top: '25%',
      left: '33.7%',
      width: '137px',
      height: '101px',
      backgroundImage: backgroundLevel1,
      id: 0,
    },
    {
      top: '22%',
      left: '36.4%',
      width: '137px',
      height: '101px',
      backgroundImage: backgroundLevel1,
      id: 1,
    },
  ],
  level3: [
    {
      top: '24.3%',
      left: '33.1%',
      width: '207px',
      height: '124px',
      backgroundImage: backgroundLevel2,
      id: 0,
    },
    {
      top: '21.7%',
      left: '35.6%',
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

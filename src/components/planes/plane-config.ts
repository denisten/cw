import backgroundLevel0 from './plane_v_1.png';
import backgroundLevel1 from './plane_v_2.png';
import backgroundLevel2 from './plane_v_3.png';

export const planeConfig: IPlaneConfig = {
  level1: [
    {
      top: '24.3%',
      left: '46.3%',
      width: '107px',
      height: '71px',
      backgroundImage: backgroundLevel0,
      id: 0,
    },
    {
      top: '25.7%',
      left: '44.3%',
      width: '107px',
      height: '71px',
      backgroundImage: backgroundLevel0,
      id: 1,
    },
  ],

  level2: [
    {
      top: '26%',
      left: '43.3%',
      width: '137px',
      height: '101px',
      backgroundImage: backgroundLevel1,
      id: 0,
    },
    {
      top: '24%',
      left: '46.1%',
      width: '137px',
      height: '101px',
      backgroundImage: backgroundLevel1,
      id: 1,
    },
  ],
  level3: [
    {
      top: '23.3%',
      left: '46.1%',
      width: '207px',
      height: '124px',
      backgroundImage: backgroundLevel2,
      id: 0,
    },
    {
      top: '25.7%',
      left: '42.6%',
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

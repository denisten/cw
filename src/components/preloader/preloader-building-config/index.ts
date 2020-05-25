import egg from './egg.png';
import egg2 from './egg2.png';
import egg3 from './egg3.png';
import main from './main.png';
import main2 from './main2.png';
import main3 from './main3.png';
import cloud from './cloud.png';
import cloud2 from './cloud2.png';
import cloud3 from './cloud3.png';
import moll from './moll.png';
import moll2 from './moll2.png';
import moll3 from './moll3.png';
import arena from './arena.png';
import arena2 from './arena2.png';
import arena3 from './arena3.png';
import tarif from './tarif.png';
import tarif2 from './tarif2.png';
import tarif3 from './tarif3.png';
import theater from './theater.png';
import theater2 from './theater2.png';
import theater3 from './theater3.png';
import { IBuildingWrapper } from '../preloader-building';

export const preloaderBuildingsConfig: IBuildingWrapper[] = [
  {
    imgs: [egg, egg2, egg3],
    left: '44%',
    top: '17%',
    width: '12.71%',
    height: '32.5%',
  },
  {
    imgs: [main, main2, main3],
    left: '57.5%',
    top: '13.5%',
    width: '9%',
    height: '46.85%',
  },
  {
    imgs: [cloud, cloud2, cloud3],
    left: '19%',
    top: '8.6%',
    width: '9.8%',
    height: '26.5%',
  },
  {
    imgs: [moll, moll2, moll3],
    left: '64.6%',
    top: '64.2%',
    width: '23.2%',
    height: '35.46%',
  },

  {
    imgs: [arena, arena2, arena3],
    left: '9.8%',
    top: '67.5%',
    width: '22.39%',
    height: '26.02%',
  },
  {
    imgs: [tarif, tarif2, tarif3],
    left: '33.8%',
    top: '20.5%',
    width: '9.42%',
    height: '38.42%',
  },
  {
    imgs: [theater, theater2, theater3],
    left: '7%',
    top: '37%',
    width: '19.63%',
    height: '31.01%',
  },
];

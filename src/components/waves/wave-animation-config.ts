import { IWaveImg } from '.';
import wave1 from './wave1.png';
import wave2 from './wave2.png';

export const waveConfig: IWaveImg[] = [
  {
    width: '146px',
    height: '233px',
    top: '8.1%',
    left: '78.6%',
    borderRadius: '0% 100% 70% 12% / 46% 43% 61% 14%',
    backgroundRepeat: 'repeat',
    background: wave1,
    backgroundSize: '100% 100%',
  },
  {
    width: '140px',
    height: '218px',
    top: '38.1%',
    left: '56.4%',
    borderRadius: '0% 100% 70% 12% / 46% 43% 61% 14%',
    backgroundRepeat: 'repeat-y',
    background: wave1,
    backgroundSize: 'contain',
  },
  {
    width: '457px',
    height: '147px',
    top: '58.4%',
    left: '27%',
    backgroundRepeat: 'repeat-x',
    background: wave2,
    backgroundSize: '100% 100%',
    borderRadius: '95% 96% 37% 45% / 100% 100% 69% 65%',
    transform: 'rotate(-28deg)',
  },
  {
    width: '357px',
    height: '46px',
    top: '46.4%',
    left: '45.5%',
    backgroundRepeat: 'repeat',
    background: wave2,
    backgroundSize: '100% 100%',
    transform: 'rotate(4deg)',
  },

  {
    width: '50px',
    height: '100px',
    top: '64.8%',
    left: '22.3%',
    backgroundRepeat: 'no-repeat',
    background: wave1,
    backgroundSize: 'unset',
  },

  {
    width: '158px',
    height: '205px',
    top: '70.1%',
    left: '25.45%',
    borderRadius: '0% 100% 70% 12% / 46% 43% 61% 14%',
    backgroundRepeat: 'repeat',
    background: wave1,
    backgroundSize: 'contain',
    transform: 'rotate(8deg)',
  },
];

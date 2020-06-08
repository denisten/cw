import { IWaveImg } from '.';
import wave1 from './wave1.png';
import wave2 from './wave2.png';
import wave3 from './wave3.png';
import wave4 from './wave4.png';
import lake from './lake.png';

export const waveConfig: IWaveImg[] = [
  {
    width: '72px',
    height: '38px',
    top: '42.8%',
    left: '42.3%',
    backgroundRepeat: 'repeat',
    background: lake,
    backgroundSize: '100% 100%',
    transform: 'rotate(331deg)',
    zIndex: 3,
  },
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
    width: '190px',
    height: '66px',
    top: '47.45%',
    left: '42.5%',
    backgroundRepeat: 'repeat',
    background: wave3,
    backgroundSize: '100% 100%',
    transform: 'rotate(-28deg)',
  },
  {
    width: '400px',
    height: '68px',
    top: '46.3%',
    left: '45%',
    backgroundRepeat: 'repeat',
    background: wave4,
    backgroundSize: '100% 100%',
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

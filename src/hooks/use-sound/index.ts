import useSound from 'use-sound';
import { SettingsStore } from '../../effector/settings/store';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useAudio = (url: string, repeat?: boolean) => {
  const { volume } = SettingsStore.getState().sound;
  const [play] = useSound(url, { volume });
  // const [audio] = useState(new Audio(url));
  // audio.volume = volume;
  // audio.loop = repeat;
  //
  // const play = () => {
  // audio.play();
  // console.log('no play');
  // };
  // const pause = () => {
  // audio.pause();
  // console.log('no pause');
  // };

  return { play };
};

import useSound from 'use-sound';
import { SettingsStore } from '../../effector/settings/store';
import { useEffect } from 'react';

export const useAudio = (url: string, repeat?: boolean) => {
  const { volume } = SettingsStore.getState().sound;
  const [play, { isPlaying }] = useSound(url, { volume });
  useEffect(() => {
    !isPlaying && repeat && play();
  }, [isPlaying]);
  return { play };
};

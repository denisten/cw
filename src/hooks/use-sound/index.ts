import useSound from 'use-sound';
import { SettingsStore } from '../../effector/settings/store';
import { useEffect } from 'react';

export const useAudio = (
  url: string,
  repeat?: boolean,
  fieldName?: 'sound' | 'music'
) => {
  const { volume } = SettingsStore.getState()[fieldName ? fieldName : 'sound'];
  const [play, { isPlaying }] = useSound(url, { volume });
  useEffect(() => {
    !isPlaying && repeat && play();
  }, [isPlaying]);
  return { play };
};

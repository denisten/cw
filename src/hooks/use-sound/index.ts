import { useStore } from 'effector-react';
import { SettingsStore } from '../../effector/settings/store';
import { useEffect, useState } from 'react';
import { toggleSound } from '../../effector/settings/events';

export const useAudio = (url: string) => {
  const { sound } = useStore(SettingsStore);
  const [audio] = useState(new Audio(url));

  const start = () => toggleSound(true);
  const stop = () => toggleSound(false);
  const toggle = () => toggleSound(!sound);

  useEffect(() => {
    sound ? audio.play() : audio.pause();
  }, [sound]);

  useEffect(() => {
    audio.addEventListener('ended', () => toggleSound(false));
    return () => {
      audio.removeEventListener('ended', () => toggleSound(false));
    };
  }, []);

  return { toggle, start, stop };
};

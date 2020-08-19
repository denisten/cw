import { useStore } from 'effector-react';
import { SettingsStore, SettingsType } from '../../effector/settings/store';
import { useEffect, useState } from 'react';
import { musicAndSoundToggle } from '../../effector/settings/events';

export const useAudio = (url: string) => {
  const { sound } = useStore(SettingsStore);
  const [audio] = useState(new Audio(url));

  const start = () =>
    musicAndSoundToggle({
      settingType: SettingsType.SOUND,
      flag: true,
    });
  const stop = () =>
    musicAndSoundToggle({
      settingType: SettingsType.SOUND,
      flag: false,
    });
  const toggle = () =>
    musicAndSoundToggle({
      settingType: SettingsType.SOUND,
      flag: !sound,
    });

  useEffect(() => {
    sound ? audio.play() : audio.pause();
  }, [sound]);

  useEffect(() => {
    audio.addEventListener('ended', () => audio.play());
    return () => {
      audio.removeEventListener('ended', () => audio.play());
    };
  }, []);

  return { toggle, start, stop };
};

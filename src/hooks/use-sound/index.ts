import { useState } from 'react';

export const useAudio = (url: string, repeat: boolean, volume: number) => {
  const [audio] = useState(new Audio(url));
  audio.volume = volume;
  audio.loop = repeat;

  const play = () => {
    audio.play();
  };
  const pause = () => {
    audio.pause();
  };

  return { play, pause };
};

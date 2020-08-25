import { useEffect, useState } from 'react';

export const useAudio = (
  url: string,
  play: boolean,
  repeat: boolean,
  volume: number
) => {
  const [audio] = useState(new Audio(url));
  audio.volume = volume;
  audio.loop = repeat;

  useEffect(() => {
    play ? audio.play() : audio.pause();
  }, [play]);
};

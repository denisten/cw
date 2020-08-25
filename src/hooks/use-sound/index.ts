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
  audio.autoplay = true;
  audio.load();

  useEffect(() => {
    play ? audio.play() : audio.pause();
  }, [play]);
};

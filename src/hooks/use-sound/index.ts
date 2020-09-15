// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useAudio = (url: string, repeat: boolean, volume: number) => {
  // const [audio] = useState(new Audio(url));
  // audio.volume = volume;
  // audio.loop = repeat;
  //
  const play = () => {
    // audio.play();
    // console.log('no play');
  };
  const pause = () => {
    // audio.pause();
    // console.log('no pause');
  };

  return { play, pause };
};

export const convertTimeToString = (seconds: number) => {
  const SECOND_IN_MINUTS = 60;
  const SECOND_IN_HOURS = 3600;
  let timeString = '';
  if (seconds <= SECOND_IN_MINUTS) {
    timeString = seconds.toFixed(0);
  } else if (seconds > SECOND_IN_MINUTS && seconds < SECOND_IN_HOURS) {
    timeString = `${Math.floor(seconds / SECOND_IN_MINUTS)}:${Math.floor(
      seconds % SECOND_IN_MINUTS
    )}`;
  } else if (seconds > SECOND_IN_HOURS) {
    const wholeMinutsToSecond =
      SECOND_IN_HOURS * Math.floor(seconds / SECOND_IN_HOURS);

    const secondsRemain =
      SECOND_IN_MINUTS *
      Math.floor((seconds - wholeMinutsToSecond) / SECOND_IN_MINUTS);
    timeString = `${Math.floor(seconds / SECOND_IN_HOURS)}:${Math.floor(
      (seconds - wholeMinutsToSecond) / SECOND_IN_MINUTS
    )}:${Math.floor(
      (seconds - wholeMinutsToSecond - secondsRemain) % SECOND_IN_MINUTS
    )}`;
  }
  return timeString;
};

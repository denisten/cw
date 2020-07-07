const second = 1000;

export const timerClosure = (secondLeft: number) => {
  let timer = secondLeft || 0;

  const _startTimer = () => {
    if (timer <= 0) return 0;
    setTimeout(() => {
      timer -= 1;
      _startTimer();
    }, second);
  };

  _startTimer();

  const getTimer = () => timer;
  return getTimer;
};

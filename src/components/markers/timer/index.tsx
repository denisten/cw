import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ZIndexes } from '../../root-component/z-indexes-enum';
import background from './background.svg';
import { MTSSans } from '../../../fonts';

const milisecondInSecond = 1000;

const TimerBody = styled.div`
  width: 154px;
  height: 35px;
  background: url(${background}) no-repeat center;
  background-size: cover;
  z-index: ${ZIndexes.UI_BUTTON};
  box-sizing: border-box;
  display: flex;
  padding: 4px 12px 12px 12px;
  overflow: hidden;

  span {
    font-family: ${MTSSans.BOLD};
    font-size: 14px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #001424;
    z-index: 2;
  }
`;

const Percent = styled.div`
  width: 30%;
  height: 100%;
  border-radius: 2px;
  background-image: linear-gradient(to top, #00cef0, #83e6f7);
  transform: skew(15deg);
  transition: 0.4s;
`;

export const Timer: React.FC<ITimer> = ({ startTime, endTime }) => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [restOfSeconds, setRestOfSeconds] = useState('');

  const convertTimeToString = (seconds: number) => {
    const SECOND_IN_MINUTS = 60;
    const SECOND_IN_HOURS = 3600;
    let timeString = '';
    if (seconds <= SECOND_IN_MINUTS) {
      timeString = seconds.toString();
    } else if (seconds > SECOND_IN_MINUTS && seconds < SECOND_IN_HOURS) {
      timeString = `${Math.floor(seconds / SECOND_IN_MINUTS)}: ${Math.floor(
        seconds % SECOND_IN_MINUTS
      )}s`;
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

  const calculateTimeDifference = () => {
    if (!startTime || !endTime) return;
    const startSeconds = startTime.getTime();
    const endSeconds = endTime.getTime();
    const differenceSeconds = (endSeconds - startSeconds) / milisecondInSecond;
    setTotalSeconds(differenceSeconds);
  };

  const calculateRestOfTime = () => {
    if (!endTime) return;
    const restOfSecond =
      (endTime.getTime() - new Date().getTime()) / milisecondInSecond;
    setRestOfSeconds(convertTimeToString(restOfSecond));
  };

  useEffect(() => {
    calculateTimeDifference();
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      calculateRestOfTime();
      clearTimeout(timeOut);
    }, milisecondInSecond);

    return () => {
      clearTimeout(timeOut);
    };
  }, [restOfSeconds]);

  return (
    <TimerBody>
      <span>{restOfSeconds}</span>
      <Percent />
    </TimerBody>
  );
};

interface ITimer {
  startTime?: Date;
  endTime?: Date;
}

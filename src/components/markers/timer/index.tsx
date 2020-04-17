import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { ZIndexes } from '../../root-component/z-indexes-enum';
import background from './background.svg';
import { MTSSans } from '../../../fonts';

const milisecondInSecond = 1000;
const maxPercent = 100;

const TimerBody = styled.div`
  width: 154px;
  height: 35px;
  background: url(${background}) no-repeat center;
  background-size: cover;
  z-index: ${ZIndexes.UI_BUTTON};
  box-sizing: border-box;
  display: flex;
  padding: 4px 14px 12px 12px;
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
    width: 100%;
    text-align: center;
  }
`;

const Percent = styled.div<{ percent: number }>`
  width: ${props => props.percent}%;
  height: 100%;
  border-radius: 2px;
  background-image: linear-gradient(to top, #00cef0, #83e6f7);
  transform: skew(15deg);
  transition: 0.4s;
`;

export const Timer: React.FC<ITimer> = ({ startTime, endTime }) => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [restOfSeconds, setRestOfSeconds] = useState('');
  const [percent, setPercent] = useState(0);
  const [timeIsOver, setTimeIsOver] = useState(false);
  const timeOutRef = useRef<null | number>(0);
  const convertTimeToString = (seconds: number) => {
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

  const calculateTimeDifference = () => {
    if (!startTime || !endTime) return;
    const startSeconds = startTime.getTime();
    const endSeconds = endTime.getTime();
    const differenceSeconds = (endSeconds - startSeconds) / milisecondInSecond;
    setTotalSeconds(differenceSeconds);
  };

  const timeIsOverHandler = () => {
    setPercent(maxPercent);
    setTimeIsOver(true);
    timeOutRef.current && clearTimeout(timeOutRef.current);
  };

  const calculateRestOfTime = () => {
    if (!endTime || !startTime) return;
    const restOfSecond =
      (endTime.getTime() - new Date().getTime()) / milisecondInSecond;
    setRestOfSeconds(convertTimeToString(restOfSecond));
    setPercent(
      Number(
        (((totalSeconds - restOfSecond) * maxPercent) / totalSeconds).toFixed(0)
      )
    );

    if (restOfSecond <= 0) {
      timeIsOverHandler();
      return;
    }
    timeOutRef.current = setTimeout(() => {
      calculateRestOfTime();
    }, milisecondInSecond);
  };

  //   const calculatePercentOfAvailableTime = (restOfSecond: number, ) => {
  //       console.log(restOfSecond * 100 / endTime.getTime() / 1000)
  //   }

  useEffect(() => {
    calculateTimeDifference();
    calculateRestOfTime();

    return () => {
      if (timeOutRef.current) clearTimeout(timeOutRef.current);
    };
  }, [totalSeconds]);

  return (
    <TimerBody>
      <span>{!timeIsOver ? restOfSeconds : 'Время вышло'}</span>
      <Percent percent={percent || 0} />
    </TimerBody>
  );
};

interface ITimer {
  startTime?: Date;
  endTime?: Date;
}

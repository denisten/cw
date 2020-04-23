import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { ZIndexes } from '../../root-component/z-indexes-enum';
import background from './background.svg';
import { MTSSans } from '../../../fonts';
import { convertTimeToString } from '../../../utils/converTimeToString';

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
  padding: 4px 10px 12px 10px;
  overflow: hidden;
  position: relative;

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
    max-width: 154px;
  }
`;

const Percent = styled.div<{ percent: number; timeIsOver: boolean }>`
  width: ${props => props.percent}%;
  height: 100%;
  border-radius: ${props => (props.timeIsOver ? '2px' : '2px 0px 0px 2px')};
  background-image: linear-gradient(to top, #00cef0, #83e6f7);
  transition: 0.4s;
`;

export const Timer: React.FC<ITimer> = ({ startTime, endTime }) => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [restOfSeconds, setRestOfSeconds] = useState('');
  const [percent, setPercent] = useState(0);
  const [timeIsOver, setTimeIsOver] = useState(false);
  const timeOutRef = useRef<null | number>(0);

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

  const setTimerDependValues = (restOfSecond: number) => {
    setRestOfSeconds(convertTimeToString(restOfSecond));
    setPercent(
      Number(
        (((totalSeconds - restOfSecond) * maxPercent) / totalSeconds).toFixed(0)
      )
    );
  };

  const calculateRestOfTime = () => {
    if (!endTime || !startTime) return;
    const restOfSecond =
      (endTime.getTime() - new Date().getTime()) / milisecondInSecond;
    setTimerDependValues(restOfSecond);

    if (restOfSecond <= 0) {
      timeIsOverHandler();
      return;
    }
    timeOutRef.current = setTimeout(() => {
      calculateRestOfTime();
    }, milisecondInSecond);
  };

  useEffect(() => {
    calculateTimeDifference();
    calculateRestOfTime();

    return () => {
      timeOutRef.current && clearTimeout(timeOutRef.current);
    };
  }, [totalSeconds]);

  useEffect(() => {
    // TODO emit when time is over
  }, [timeIsOver]);

  return (
    <TimerBody>
      <span>{!timeIsOver ? restOfSeconds : 'Время вышло'}</span>
      <Percent percent={percent || 0} timeIsOver={timeIsOver} />
    </TimerBody>
  );
};

interface ITimer {
  startTime?: Date;
  endTime?: Date;
}

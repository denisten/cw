import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ZIndexes } from '../../root-component/z-indexes-enum';
import background from './background.svg';
import { MTSSans } from '../../../fonts';

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
  //   const [time, setTime] = useState<undefined | string>('');

  const calculateTimeDifference = () => {
    if (!startTime || !endTime) return false;
    const startSeconds = startTime.getTime();
    const endSeconds = endTime.getTime();
    const difference = endSeconds - startSeconds;
    return difference;
  };

  useEffect(() => {
    calculateTimeDifference();
  }, []);

  return (
    <TimerBody>
      <span>12:57:44</span>
      <Percent />
    </TimerBody>
  );
};

interface ITimer {
  startTime?: Date;
  endTime?: Date;
}

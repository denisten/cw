import React from 'react';
import styled from 'styled-components';
import { MTSSans } from '../../fonts';
import timerIcon from './timer.svg';
import { RowWrapper } from '../row-wrapper';

const TaskTimerWrapper = styled.div`
  font-family: ${MTSSans.REGULAR};
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 24px;
  display: flex;
  align-items: center;
  letter-spacing: -0.4px;
  color: #76a2a9;
`;

const styledConfig = {
  img: {
    marginRight: '8px',
  },
};
const secondsPerDay = 86400,
  secondsPerHour = 3600,
  secondsPerMinute = 60;
const parseSecondsLeft = (secondsLeft: number | null) => {
  if (secondsLeft === null) return;
  const daysLeft = Math.floor(secondsLeft / secondsPerDay);
  const hoursLeft = Math.floor(secondsLeft / secondsPerHour);
  const minutesLeft = Math.floor(secondsLeft / secondsPerMinute);
  let answer = '';
  if (daysLeft) answer += daysLeft + 'д.';
  if (hoursLeft) answer += hoursLeft + 'ч.';
  if (minutesLeft) answer += minutesLeft + 'мин.';
  answer += (secondsLeft % secondsPerMinute) + 'сек.';
  return answer;
};

export const TaskTimer: React.FC<ITaskTimer> = ({ secondsLeft }) => {
  return (
    <TaskTimerWrapper>
      <RowWrapper displayFlag={!!secondsLeft}>
        <img src={timerIcon} alt="timer" style={styledConfig.img} />
        {parseSecondsLeft(secondsLeft)}
      </RowWrapper>
    </TaskTimerWrapper>
  );
};

interface ITaskTimer {
  secondsLeft: number | null;
}
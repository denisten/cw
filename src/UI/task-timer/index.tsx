import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { MTSSans } from '../../fonts';
import timerIcon from './timer.svg';
import { RowWrapper } from '../row-wrapper';
import { hideMarker } from '../../effector/towers-marker/events';
import { MarkerTypes } from '../../components/markers';
import { TowersTypes } from '../../effector/towers-progress/store';

const TaskTimerWrapper = styled.div<ITaskTimerWrapper>`
  font-family: ${MTSSans.REGULAR};
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 24px;
  display: flex;
  align-items: center;
  letter-spacing: -0.4px;
  color: #76a2a9;
  min-width: 140px;
  visibility: ${props => (props.expireInSeconds ? 'visible' : 'hidden')};
`;

const styledConfig = {
  img: {
    marginRight: '8px',
  },
};

const secondsPerDay = 86400,
  secondsPerHour = 3600,
  secondsPerMinute = 60,
  second = 1000;

const parseSecondsLeft = (secondsLeft: number | null) => {
  if (secondsLeft === null) return;
  const daysLeft = Math.floor(secondsLeft / secondsPerDay);
  secondsLeft -= daysLeft * secondsPerDay;
  const hoursLeft = Math.floor(secondsLeft / secondsPerHour);
  secondsLeft -= hoursLeft * secondsPerHour;
  const minutesLeft = Math.floor(secondsLeft / secondsPerMinute);
  secondsLeft -= minutesLeft * secondsPerMinute;
  let answer = '';
  if (daysLeft) answer += daysLeft + 'д.';
  if (hoursLeft) answer += hoursLeft + 'ч.';
  if (minutesLeft) answer += minutesLeft + 'мин.';
  answer += secondsLeft + 'сек.';
  return answer;
};

export const TaskTimer: React.FC<ITaskTimer> = ({
  expireInSeconds,
  towerTitle,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(expireInSeconds || null);
  const timerRef = useRef(0);

  useEffect(() => {
    if (secondsLeft) {
      timerRef.current = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, second);
    } else if (secondsLeft === 0) {
      clearTimeout(timerRef.current);
      hideMarker({
        type: MarkerTypes.ACTIVE_TASK,
        towerTitle,
      });
    }
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [secondsLeft]);
  return (
    <TaskTimerWrapper expireInSeconds={expireInSeconds}>
      <RowWrapper>
        <img src={timerIcon} alt="timer" style={styledConfig.img} />
        {parseSecondsLeft(secondsLeft)}
      </RowWrapper>
    </TaskTimerWrapper>
  );
};

interface ITaskTimer extends ITaskTimerWrapper {
  towerTitle: TowersTypes;
}

interface ITaskTimerWrapper {
  expireInSeconds: number | null;
}

import React from 'react';
import { TasksRow } from '../../tasks-row';
import { TaskSubType } from '../..';

export const Task: React.FC<{ active: boolean }> = ({ active }) => (
  <div hidden={!active}>
    <TasksRow type={TaskSubType.COSMETICS} taskTitle="NBO здадание"></TasksRow>
  </div>
);

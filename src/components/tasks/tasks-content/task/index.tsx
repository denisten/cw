import React from 'react';
import { TasksRow } from '../../tasks-row';

export const Task: React.FC<{ active: boolean }> = ({ active }) => (
  <div hidden={!active}>
    <TasksRow></TasksRow>
  </div>
);

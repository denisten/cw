import React from 'react';
import { pushMoveElements } from '../../effector/reward/events';

export const animateTaskReward = (reward: number, e: React.MouseEvent) => {
  if (reward > 0) {
    pushMoveElements({ x: e.clientX, y: e.clientY, id: 0 });
  }
};

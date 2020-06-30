import React from 'react';
import { pushMoveElems } from '../../effector/reward/events';

export const animateTaskReward = (reward: number, e: React.MouseEvent) => {
  if (reward > 0) {
    pushMoveElems({ x: e.clientX, y: e.clientY, id: 0 });
  }
};

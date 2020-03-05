import React from 'react';
import { useLocation } from 'react-router';
import { turnOffTutorialMode } from '../../effector/app-condition/events';

export const SkipTutorial = () => {
  const historyLog = useLocation();
  if (historyLog.search.replace('?', '') === 'disableTutorial')
    turnOffTutorialMode();
  return null;
};

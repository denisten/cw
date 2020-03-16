import React from 'react';
import { TowerInfoDescription } from '../tower-info-description';
const taskText = [
  `Скоро тут появятся задания, выполняя которые, ты сможешь улучшать свой
город и зарабатывать валюту (название)`,
];
export const TowerInfoTask = () => {
  return <TowerInfoDescription text={taskText} />;
};

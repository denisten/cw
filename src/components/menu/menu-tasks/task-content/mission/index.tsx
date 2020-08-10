import React from 'react';
import { useStore } from 'effector-react';
import { MissionsStore } from '../../../../../effector/missions-store/store';
import { TasksWrapper } from '../task';
import { MissionsView } from '../../../../missions-view';

export const Mission: React.FC<IMission> = ({ active }) => {
  const missions = useStore(MissionsStore);

  return (
    <TasksWrapper hidden={!active}>
      {missions.map(el => (
        <MissionsView taskData={el} isInTowerInfo={false} key={el.id} />
      ))}
    </TasksWrapper>
  );
};

interface IMission {
  active: boolean;
}

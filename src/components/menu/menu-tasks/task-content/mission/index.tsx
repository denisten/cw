import React, { useState } from 'react';
import { useStore } from 'effector-react';
import { MissionsStore } from '../../../../../effector/missions-store/store';
import { TasksWrapper } from '../task';
import { ReducedMissionRow } from '../../../../missions-view/reduced-mission-row';
import { ITask } from '../../../../../effector/tasks-store/store';
import { MissionInfo } from '../../../../missions-view/mission-info';
import { Cap } from './cap';

export const Mission: React.FC<IMission> = ({ active }) => {
  const missions = useStore(MissionsStore);
  const [selectedMission, setSelectedMission] = useState<ITask | null>(null);

  return (
    <TasksWrapper hidden={!active}>
      {selectedMission ? (
        <MissionInfo
          isInTowerInfo={false}
          mission={selectedMission}
          exitCallback={() => setSelectedMission(null)}
        />
      ) : missions.length ? (
        missions.map(el => (
          <ReducedMissionRow
            mission={el}
            key={el.id}
            isInTowerInfo={false}
            callback={() => setSelectedMission(el)}
          />
        ))
      ) : (
        <Cap />
      )}
    </TasksWrapper>
  );
};

interface IMission {
  active: boolean;
}

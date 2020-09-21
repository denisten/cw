import { useEffect } from 'react';
import { hideMarker } from '../../effector/towers-marker/events';
import { MarkerTypes } from '../../components/markers';
import { ITask } from '../../effector/tasks-store/store';
import { TowersTypes } from '../../effector/towers-progress/store';
import { filterTasksArray } from '../../utils/filtered-missions-array';

export const useHideEmptyTaskMarker = ({
  tasks,
  missions,
  towerTitle,
}: IHideEmptyTaskMarker) => {
  const filteredTasks = filterTasksArray(tasks, towerTitle);
  const filteredMissions = filterTasksArray(missions, towerTitle);
  useEffect(() => {
    if (!filteredTasks.length && !filteredMissions.length) {
      hideMarker({ towerTitle, type: MarkerTypes.TASK });
    }
  }, [filteredTasks.length, filteredMissions.length]);
};

interface IHideEmptyTaskMarker {
  tasks: ITask[];
  missions: ITask[];
  towerTitle: TowersTypes;
}

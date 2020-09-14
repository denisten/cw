import { useEffect } from 'react';
import { hideMarker } from '../../effector/towers-marker/events';
import { MarkerTypes } from '../../components/markers';
import { ITask } from '../../effector/tasks-store/store';
import { TowersTypes } from '../../effector/towers-progress/store';

export const useHideEmptyTaskMarker = ({
  filteredTasks,
  filteredMissions,
  towerTitle,
}: IHideEmptyTaskMarker) => {
  useEffect(() => {
    if (!filteredTasks.length && !filteredMissions.length) {
      hideMarker({ towerTitle, type: MarkerTypes.TASK });
    }
  }, [filteredTasks.length, filteredMissions.length]);
};

interface IHideEmptyTaskMarker {
  filteredTasks: ITask[];
  filteredMissions: ITask[];
  towerTitle: TowersTypes;
}

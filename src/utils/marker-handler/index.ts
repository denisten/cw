import { TowersTypes } from '../../effector/towers-progress/store';
import { TasksStore, TaskStatuses } from '../../effector/missions-store/store';
import {
  setMarker,
  clearTaskMarkersOnCurrentTower,
  hideMarker,
} from '../../effector/towers-marker/events';
import { TypeOfMarkers } from '../../components/markers';
import { TasksType } from '../../components/menu/menu-tasks';

export const markerHandler = () => {
  const missions = TasksStore.getState().map(missionItem => {
    return {
      status: missionItem.status,
      towerTitle: missionItem.task.content.product.slug,
      taskType: missionItem.task.content.taskType.slug,
    };
  });
  Object.values(TowersTypes).forEach(towerTitle => {
    clearTaskMarkersOnCurrentTower(towerTitle);
    missions.forEach(mission => {
      const { status } = mission;
      if (mission.towerTitle === towerTitle) {
        if (status === TaskStatuses.CREATED || status === TaskStatuses.ACTIVE) {
          setMarker({
            towerTitle,
            type: TypeOfMarkers.TASK,
          });
        }
        if (status === TaskStatuses.DONE) {
          setMarker({
            towerTitle,
            type: TypeOfMarkers.SUCCESS,
          });
        }

        if (status === TaskStatuses.ACTIVE) {
          if (mission.taskType !== TasksType.COSMETIC) {
            setMarker({
              towerTitle,
              type: TypeOfMarkers.ACTIVE_TASK,
            });
          }
        }

        if (status === TaskStatuses.VERIFICATION) {
          hideMarker({
            towerTitle,
            type: TypeOfMarkers.TAKE_REWARD,
          });
        }
      }
    });
  });
};

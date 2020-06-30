import { TaskStatuses } from '../../api/tasks/get-tasks';
import { TowersTypes } from '../../effector/towers-progress/store';
import { MissionsStore } from '../../effector/missions-store/store';
import { hideMarker, setMarker } from '../../effector/towers-marker/events';
import { TypeOfMarkers } from '../../components/markers';

export const markerHandler = (
  status: TaskStatuses,
  productTitle: TowersTypes
) => {
  const state = MissionsStore.getState();
  const numberOfDoneTasksInCurrentProduct = state.filter(
    el =>
      el.task.content.product.slug === productTitle &&
      el.status === TaskStatuses.DONE
  ).length;
  const numberOfTasksInCurrentProduct = state.filter(
    el => el.task.content.product.slug === productTitle
  ).length;
  if (
    status === TaskStatuses.ACTIVE ||
    (status === TaskStatuses.DONE && numberOfDoneTasksInCurrentProduct)
  ) {
    setMarker({
      towerTitle: productTitle,
      type: TypeOfMarkers.SUCCESS,
    });
  } else {
    hideMarker({ towerTitle: productTitle, type: TypeOfMarkers.SUCCESS });
  }

  if (!numberOfTasksInCurrentProduct) {
    hideMarker({ towerTitle: productTitle, type: TypeOfMarkers.TASK });
  }
};

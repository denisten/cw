import { MarkerTypes } from '../../components/markers';
import { TaskStatuses } from '../../effector/tasks-store/store';

export const detectTaskStatus = (taskStatus: TaskStatuses) => {
  switch (taskStatus) {
    case TaskStatuses.ACTIVE:
      return MarkerTypes.ACTIVE_TASK;
    case TaskStatuses.DONE:
      return MarkerTypes.SUCCESS;
    case TaskStatuses.CREATED:
    default:
      return MarkerTypes.TASK;
  }
};

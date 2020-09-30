import { ITask, TaskStatuses } from '../../effector/tasks-store/store';

export const calculateCompletedSubTasksQuantity = (mission: ITask) => {
  const wantedTaskStatusesSet = new Set([TaskStatuses.REWARDED]);
  return mission.userSubTasks.filter(el => wantedTaskStatusesSet.has(el.status))
    .length;
};

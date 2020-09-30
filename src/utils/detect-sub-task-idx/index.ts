import { ITask, TaskStatuses } from '../../effector/tasks-store/store';

export const detectSubTaskIdx = (tasks: ITask[]) => {
  const wantedStatuses = new Set([
    TaskStatuses.CREATED,
    TaskStatuses.ACTIVE,
    TaskStatuses.REJECTED,
    TaskStatuses.DONE,
  ]);
  for (let taskIdx = 0; taskIdx < tasks.length; taskIdx++)
    if (wantedStatuses.has(tasks[taskIdx].status)) return taskIdx;
  return -1;
};

import { ITask, TaskStatuses } from '../../effector/missions-store/store';

export const handleTaskStatusChange = (
  state: ITask[],
  payload: number,
  nextStatus: TaskStatuses
) => {
  const newState = [...state];
  const currentEl = newState.findIndex(el => el.id === payload);
  newState[currentEl].status = nextStatus;
  return newState;
};

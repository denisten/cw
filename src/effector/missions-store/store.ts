import { MissionsDomain } from './domain';
import { saveMission } from './events';
import { ITask, TaskStatuses } from '../tasks-store/store';
import {
  getTaskReward,
  updateTaskStatus,
  resetMissionsStore,
} from '../tasks-store/events';
import { TaskTypes } from '../../app';

const initState: ITask[] = [];

export const MissionsStore = MissionsDomain.store(initState)
  .on(updateTaskStatus, (state, { status, taskId, isSubtask }) => {
    const stateClone = [...state];
    if (!isSubtask) return state;
    let taskIdx = -1,
      missionIdx = -1;
    for (let i = 0; i < state.length; i++) {
      taskIdx = state[i].userSubTasks.findIndex(el => el.id === taskId);
      missionIdx = i;
      if (taskIdx !== -1) break;
    }
    const mission = state[missionIdx].userSubTasks[taskIdx];
    mission.status = status;
    stateClone[missionIdx].userSubTasks[taskIdx].status = status;
    return stateClone;
  })
  .on(getTaskReward.doneData, (state, { id, taskType }) => {
    const stateCopy = [...state];
    if (taskType === TaskTypes.MISSION) {
      const missionIdx = state.findIndex(el => el.id === id);
      stateCopy.splice(missionIdx, 1);
    } else if (taskType === TaskTypes.SUBTASK) {
      for (let i = 0; i < state.length; i++) {
        const subtaskIdx = state[i].userSubTasks.findIndex(el => el.id === id);
        if (subtaskIdx !== -1) {
          stateCopy[i].userSubTasks[subtaskIdx].status = TaskStatuses.REWARDED;
          if (subtaskIdx === state[i].userSubTasks.length - 1) {
            stateCopy[i].status = TaskStatuses.DONE;
          }
        }
      }
    }
    return stateCopy;
  })
  .on(saveMission, (_, payload) => payload)
  .reset(resetMissionsStore);

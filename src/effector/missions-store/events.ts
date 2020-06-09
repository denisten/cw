import { MissionsDomain } from './domain';
import { getTasks } from '../../api/tasks/get-tasks';
import { activateTaskRequest } from '../../api/tasks/activate';
import { verifyTaskRequest } from '../../api/tasks/verify';
import { rewardRequest } from '../../api/tasks/reward';

export const fetchTasks = MissionsDomain.effect('fetch missions', {
  handler: async () => {
    return await getTasks();
  },
});

export const activateTask = MissionsDomain.effect(
  'activate current task and fetch new list',
  {
    handler: async (id: number) => {
      return await activateTaskRequest(id);
    },
  }
);

export const verifyTask = MissionsDomain.effect('verify current task', {
  handler: async (id: number) => {
    return await verifyTaskRequest(id);
  },
});
export const takeReward = MissionsDomain.effect({
  handler: async (id: number) => {
    const response = await rewardRequest(id);
    return { ...response, id };
  },
});

export const decreaseTimer = MissionsDomain.event();

export const finishTask = MissionsDomain.event<number>(
  'take reward and delete from store'
);

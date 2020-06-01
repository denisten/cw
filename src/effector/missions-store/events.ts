import { MissionsDomain } from './domain';
import { getTasks } from '../../api/tasks/get-tasks';
import { activateTaskRequest } from '../../api/tasks/activate';
import { verifyTaskRequest } from '../../api/tasks/verify';

export const fetchTasks = MissionsDomain.effect('fetch missions', {
  handler: async () => {
    return await getTasks();
  },
});

export const activateTask = MissionsDomain.effect('activate current task', {
  handler: async (id: number) => {
    await activateTaskRequest(id);
    return id;
  },
});

export const verifyTask = MissionsDomain.effect('verify current task', {
  handler: async (id: number) => {
    await verifyTaskRequest(id);
    return id;
  },
});

export const finishTask = MissionsDomain.event<number>(
  'take reward and delete from store'
);

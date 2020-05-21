import { MissionsDomain } from './domain';
import { getTasks } from '../../api/get-tasks';

export const fetchTasks = MissionsDomain.effect('fetch missions', {
  handler: async () => {
    return await getTasks();
  },
});

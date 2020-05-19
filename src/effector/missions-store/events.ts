import { MissionsDomain } from './domain';
import { IMission } from './store';
import { getTasks } from '../../api/get-tasks';

export const addMission = MissionsDomain.event<IMission>();
export const fetchTasks = MissionsDomain.effect('fetch missions', {
  handler: async () => {
    return await getTasks();
  },
});

import { MissionsDomain } from './domain';
import { saveMission } from './events';
import { ITask } from '../task-store/store';

const initState: ITask[] = [];

export const MissionsStore = MissionsDomain.store(initState).on(
  saveMission,
  (_, payload) => payload
);

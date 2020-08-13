import { MissionsDomain } from './domain';
import { ITask } from '../tasks-store/store';

export const saveMission = MissionsDomain.event<ITask[]>();

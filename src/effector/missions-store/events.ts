import { MissionsDomain } from './domain';
import { ITask } from '../task-store/store';

export const saveMission = MissionsDomain.event<ITask[]>();

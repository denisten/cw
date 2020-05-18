import { MissionsDomain } from './domain';
import { IMission } from './store';

export const addMission = MissionsDomain.event<IMission>();

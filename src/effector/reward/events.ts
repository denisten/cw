import { RewardDomain } from './domain';
import { ImoveCoinElements } from './store';

export const removeMoveElems = RewardDomain.event<number>();
export const setMoveCoinFinished = RewardDomain.event<boolean>();
export const pushMoveElems = RewardDomain.event<ImoveCoinElements>();

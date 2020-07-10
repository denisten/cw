import { RewardDomain } from './domain';
import { IMoveCoinElement } from './store';

export const removeMoveElems = RewardDomain.event<number>();
export const setMoveCoinFinished = RewardDomain.event<boolean>();
export const pushMoveElements = RewardDomain.event<IMoveCoinElement>();

import { RewardDomain } from './domain';
import {
  setMoveCoinFinished,
  removeMoveElems,
  pushMoveElements,
} from './events';
import { generateUniqueID } from '../../utils/generate-unique-id';

const initState = {
  lootRewardCordinatesQueue: [],
  isCoinRelocateAnimationEnded: false,
};

export const RewardStore = RewardDomain.store<RewardCordinatesStoreType>(
  initState
)
  .on(setMoveCoinFinished, (state, payload) => ({
    ...state,
    isCoinRelocateAnimationEnded: payload,
  }))
  .on(removeMoveElems, (state, id) => ({
    ...state,
    lootRewardCordinatesQueue: state.lootRewardCordinatesQueue.filter(
      item => item.id !== id
    ),
  }))
  .on(pushMoveElements, (state, payload) => {
    const newState = { ...state };
    const coinObject = { ...payload };
    if (newState.lootRewardCordinatesQueue.length === 0) {
      coinObject.id = 0;
    } else {
      coinObject.id =
        newState.lootRewardCordinatesQueue.length + generateUniqueID();
    }
    newState.lootRewardCordinatesQueue = [
      ...newState.lootRewardCordinatesQueue,
      coinObject,
    ];
    return newState;
  });

export type RewardCordinatesStoreType = {
  lootRewardCordinatesQueue: IMoveCoinElement[];
  isCoinRelocateAnimationEnded: boolean;
};

export interface IMoveCoinElement {
  x: number;
  y: number;
  id: number;
}

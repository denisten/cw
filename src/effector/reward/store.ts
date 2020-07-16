import { RewardDomain } from './domain';
import {
  setMoveCoinFinished,
  removeMoveElems,
  pushMoveElements,
} from './events';
import { generateUniqueID } from '../../utils/generate-unique-id';

const initState = {
  lootRewardCoordinatesQueue: [],
  isCoinRelocateAnimationEnded: false,
};

export const RewardStore = RewardDomain.store<IRewardStore>(initState)
  .on(setMoveCoinFinished, (state, payload) => ({
    ...state,
    isCoinRelocateAnimationEnded: payload,
  }))
  .on(removeMoveElems, (state, id) => ({
    ...state,
    lootRewardCoordinatesQueue: state.lootRewardCoordinatesQueue.filter(
      item => item.id !== id
    ),
  }))
  .on(pushMoveElements, (state, payload) => {
    const newState = { ...state };
    const coinObject = { ...payload };
    if (newState.lootRewardCoordinatesQueue.length === 0) {
      coinObject.id = 0;
    } else {
      coinObject.id =
        newState.lootRewardCoordinatesQueue.length + generateUniqueID();
    }
    newState.lootRewardCoordinatesQueue = [
      ...newState.lootRewardCoordinatesQueue,
      coinObject,
    ];
    return newState;
  });

export interface IRewardStore {
  lootRewardCoordinatesQueue: IMoveCoinElement[];
  isCoinRelocateAnimationEnded: boolean;
}

export interface IMoveCoinElement {
  x: number;
  y: number;
  id: number;
}

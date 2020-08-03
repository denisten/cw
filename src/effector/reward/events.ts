import { RewardDomain } from './domain';
import { IMoveCoinElement } from './store';
import { markersEnumeration } from '../../utils/markers-enumeration';
import { getIncome } from '../../api/get-income';

export const removeMoveElems = RewardDomain.event<number>();
export const setMoveCoinFinished = RewardDomain.event<boolean>();
export const pushMoveElements = RewardDomain.event<IMoveCoinElement>();

export const fetchIncomes = RewardDomain.effect('verify current task', {
  handler: async () => {
    return markersEnumeration(await getIncome());
  },
});

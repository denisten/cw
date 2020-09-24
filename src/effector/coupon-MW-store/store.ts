import { CouponMWDomain } from './domain';
import { TowersTypes } from '../towers-progress/store';
import { closeCouponModalWindow, openCouponModalWindow } from './events';

const initState = {
  displayFlag: false,
  towerTitle: null,
  taskId: null,
};

export const CouponMWStore = CouponMWDomain.store<ICouponMWStore>(initState)
  .on(closeCouponModalWindow, state => ({
    ...state,
    displayFlag: false,
  }))
  .on(openCouponModalWindow, (state, { taskId, towerTitle }) => ({
    displayFlag: true,
    taskId,
    towerTitle,
  }));

interface ICouponMWStore {
  displayFlag: boolean;
  towerTitle: TowersTypes | null;
  taskId: number | null;
}

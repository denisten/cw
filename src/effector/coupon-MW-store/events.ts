import { CouponMWDomain } from './domain';
import { TowersTypes } from '../towers-progress/store';

export const closeCouponModalWindow = CouponMWDomain.event();

export const openCouponModalWindow = CouponMWDomain.event<
  IOpenCouponModalWindow
>();

interface IOpenCouponModalWindow {
  towerTitle: TowersTypes;
  taskId: number;
}

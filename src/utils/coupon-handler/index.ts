import { activateCoupon } from '../../api/activate-coupon';
import { CouponTypes } from '../../effector/coupons/store';
import { ResponseStatuses } from '../../constants';
import { clearChat } from '../../effector/chat/events';
import { coughtError } from '../../effector/error-boundary-store/events';
import { TowersTypes } from '../../effector/towers-progress/store';
import { ITabSwitchers } from '../../components/tower-info';
import { markerHandler } from '../marker-handler';

export const couponHandler = async (
  taskId: number,
  selectedCoupon: CouponTypes,
  towerTitle?: TowersTypes,
  switchers?: ITabSwitchers
) => {
  const response = await activateCoupon(selectedCoupon, taskId); // TODO попросить бэк возвращать измененный count купонов
  if (response.state === ResponseStatuses.SUCCESS) {
    markerHandler();
    towerTitle && clearChat({ towerTitle });
    switchers && switchers.openTasksTab();
  } else {
    coughtError({
      text: response.data.msg,
    });
  }
};

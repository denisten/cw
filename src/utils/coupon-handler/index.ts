import { activateCoupon } from '../../api/activate-coupon';
import { CouponTypes } from '../../effector/coupons/store';
import { ResponseStatuses } from '../../constants';
import { clearChat } from '../../effector/chat/events';
import { coughtError } from '../../effector/error-boundary-store/events';
import { TowersTypes } from '../../effector/towers-progress/store';
import { ITabSwitchers } from '../../components/tower-info';
import { hideMarker } from '../../effector/towers-marker/events';
import { MarkerTypes } from '../../components/markers';

export const couponHandler = async (
  taskId: number,
  selectedCoupon: CouponTypes,
  towerTitle?: TowersTypes,
  switchers?: ITabSwitchers
) => {
  const response = await activateCoupon(selectedCoupon, taskId);
  if (response.state === ResponseStatuses.SUCCESS) {
    if (towerTitle) {
      clearChat({ towerTitle });
      hideMarker({ towerTitle, type: MarkerTypes.ACTIVE_TASK });
    }
    switchers && switchers.openTasksTab();
  } else {
    coughtError({
      text: response.data.msg,
    });
  }
};

import { activateCoupon } from '../../api/activate-coupon';
import { CouponTypes } from '../../effector/coupons/store';
import { ResponseStatuses } from '../../constants';
import { clearChat } from '../../effector/chat/events';
import { coughtError } from '../../effector/error-boundary-store/events';
import { TowersTypes } from '../../effector/towers-progress/store';
import { ITabSwitchers } from '../../components/tower-info';
import { hideMarker } from '../../effector/towers-marker/events';
import { MarkerTypes } from '../../components/markers';
import { updateTaskStatus } from '../../effector/tasks-store/events';
import { TaskStatuses } from '../../effector/tasks-store/store';

export const couponHandler = async (
  taskId: number | null,
  selectedCoupon: CouponTypes,
  towerTitle: TowersTypes | null,
  switchers?: ITabSwitchers
) => {
  if (!taskId) return;
  const response = await activateCoupon(selectedCoupon, taskId);
  if (response.state === ResponseStatuses.SUCCESS) {
    if (towerTitle) {
      clearChat({ towerTitle });
      hideMarker({ towerTitle, type: MarkerTypes.ACTIVE_TASK });
    }
    if (selectedCoupon === CouponTypes.COUPON_SKIP) {
      updateTaskStatus({
        taskId,
        status: TaskStatuses.REWARDED,
        isSubtask: true,
      });
    }
    switchers && switchers.openTasksTab();
  } else {
    coughtError({
      text: response.data.msg,
    });
  }
};

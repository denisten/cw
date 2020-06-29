import { activateCoupon } from '../../api/activate-coupon';
import { CouponTypes } from '../../effector/store/store';
import { responseStates } from '../../constants';
import { fetchTasks } from '../../effector/missions-store/events';
import { editCouponCount } from '../../effector/store/events';
import { clearChat } from '../../effector/task-messages/events';
import { coughtError } from '../../effector/error-boundary-store/events';
import { TowersTypes } from '../../effector/towers-progress/store';
import { ITabSwitchers } from '../../components/tower-info';

export const couponHandler = async (
  taskId: number | undefined,
  count: number,
  towerTitle: TowersTypes,
  switchers?: ITabSwitchers
) => {
  if (taskId) {
    const response = await activateCoupon(CouponTypes.COUPON_REPLACE, taskId);
    if (response.state === responseStates.SUCCESS) {
      await fetchTasks('');
      editCouponCount({
        couponType: CouponTypes.COUPON_REPLACE,
        count: count - 1,
      });
      clearChat({ towerTitle });
      switchers && switchers.openTasksTab();
    } else {
      coughtError({
        text: response.data.msg,
      });
    }
  }
};

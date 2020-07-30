import { activateCoupon } from '../../api/activate-coupon';
import { ShopItemsType, UserMarketStore } from '../../effector/coupons/store';
import { ResponseStatuses } from '../../constants';
import { editCouponCount } from '../../effector/coupons/events';
import { clearChat } from '../../effector/chat/events';
import { coughtError } from '../../effector/error-boundary-store/events';
import { TowersTypes } from '../../effector/towers-progress/store';
import { ITabSwitchers } from '../../components/tower-info';
import { markerHandler } from '../marker-handler';

export const couponHandler = async (
  taskId: number | undefined,
  count: number,
  towerTitle?: TowersTypes,
  switchers?: ITabSwitchers
) => {
  const { count: couponCount } = UserMarketStore.getState().userItems[
    ShopItemsType.COUPON_REPLACE
  ];
  if (taskId && couponCount) {
    const response = await activateCoupon(ShopItemsType.COUPON_REPLACE, taskId);
    if (response.state === ResponseStatuses.SUCCESS) {
      editCouponCount({
        couponType: ShopItemsType.COUPON_REPLACE,
        count: count - 1,
      });
      markerHandler();
      towerTitle && clearChat({ towerTitle });
      switchers && switchers.openTasksTab();
    } else {
      coughtError({
        text: response.data.msg,
      });
    }
  } else {
    coughtError({
      text: 'У вас кончились купоны',
    });
  }
};

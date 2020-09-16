import { useEffect } from 'react';
import {
  editIsAuthorizedFlag,
  setDataReceived,
  setIsLogout,
} from '../../effector/app-condition/events';
import { resetMissionsStore } from '../../effector/tasks-store/events';
import { resetChatStore } from '../../effector/chat/events';
import { resetTowersMarker } from '../../effector/towers-marker/events';
import { resetTowerProgress } from '../../effector/towers-progress/events';
import { resetUserShopStore } from '../../effector/coupons/events';
import { resetUserDataStore } from '../../effector/user-data/events';

export const useLogout = (isLogout: boolean) => {
  useEffect(() => {
    if (isLogout) {
      editIsAuthorizedFlag(false);
      resetMissionsStore();
      resetChatStore();
      resetTowersMarker();
      resetTowerProgress();
      setDataReceived(false);
      resetUserShopStore();
      resetUserDataStore();
      setIsLogout(false);
    }
  }, [isLogout]);
};

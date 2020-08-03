import { useEffect } from 'react';
import {
  defaultNameValue,
  UserDataStore,
} from '../../effector/user-data/store';
import { saveUserData } from '../../api/save-user-data';
import { fetchUserData, getAccountData } from '../../effector/user-data/events';
import { fetchAllProductsData } from '../../effector/towers-progress/events';
import { openWsConnection } from '../../api/centrifuge';
import {
  editTutorialSliderDisplayFlag,
  setDataReceived,
} from '../../effector/app-condition/events';
import { fetchUserPurchases } from '../../effector/coupons/events';
import { markerHandler } from '../../utils/marker-handler';
import { scoreSuccessRequests } from '../../effector/preloader/events';
import { fetchIncomes } from '../../effector/reward/events';

const fetchsArray = [
  fetchAllProductsData,
  getAccountData,
  fetchUserPurchases,
  fetchIncomes,
  fetchUserData,
];

const waitForAllRequestsIsDone = () => {
  return new Promise(resolve => {
    let resolvedRequests = 0;
    fetchsArray.forEach(async fetchAction => {
      await fetchAction('');
      scoreSuccessRequests();
      resolvedRequests += 1;
      if (resolvedRequests === fetchsArray.length) {
        resolve(true);
      }
    });
  });
};

const prepareMapTo = () => {
  markerHandler();
  setDataReceived(true);
  editTutorialSliderDisplayFlag(true);
  scoreSuccessRequests();
};

const handleAuth = async (isAuthorized: boolean, dataReceived: boolean) => {
  if (isAuthorized && !dataReceived) {
    const { worldName } = UserDataStore.getState();
    if (worldName && worldName !== defaultNameValue) {
      await saveUserData({ worldName });
    }

    await waitForAllRequestsIsDone();
    await openWsConnection();
    prepareMapTo();
  }
};

export const useHandleAuth: (args: IUseHandleAuth) => void = ({
  isAuthorized,
  dataReceived,
}) => {
  useEffect(() => {
    handleAuth(isAuthorized, dataReceived);
  }, [isAuthorized]);
};

interface IUseHandleAuth {
  isAuthorized: boolean;
  dataReceived: boolean;
}

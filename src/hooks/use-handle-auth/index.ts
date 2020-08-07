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
import { markerHandler } from '../../utils/marker-handler';
import { scoreSuccessRequests } from '../../effector/preloader/events';
import { fetchIncomes } from '../../effector/reward/events';

const authHandlersList = [
  fetchAllProductsData,
  getAccountData,
  fetchIncomes,
  fetchUserData,
];

const waitForAllRequestsIsDone = () => {
  return new Promise(resolve => {
    let resolvedRequests = 0;
    authHandlersList.forEach(async request => {
      await request('');
      scoreSuccessRequests();
      resolvedRequests += 1;
      if (resolvedRequests === authHandlersList.length) {
        resolve(true);
      }
    });
  });
};

const prepareMap = () => {
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
    prepareMap();
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

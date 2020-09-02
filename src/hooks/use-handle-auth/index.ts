import { useEffect } from 'react';
import {
  defaultNameValue,
  UserDataStore,
} from '../../effector/user-data/store';
import { saveUserData } from '../../api/save-user-data';
import { fetchUserData } from '../../effector/user-data/events';
import { fetchAllProductsData } from '../../effector/towers-progress/events';
import { openWsConnection } from '../../api/centrifuge';
import {
  editTutorialSliderDisplayFlag,
  setDataReceived,
} from '../../effector/app-condition/events';
import { scoreSuccessRequests } from '../../effector/preloader/events';
import { fetchIncomes } from '../../effector/reward/events';
import { TutorialStore } from '../../effector/tutorial-store/store';
import { disableTutorialRequest } from '../../api/disable-tutorial';

const authHandlersList = [fetchAllProductsData, fetchIncomes, fetchUserData];

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
  setDataReceived(true);
  editTutorialSliderDisplayFlag(true);
  scoreSuccessRequests();
};

const disablePassedTutorial = () => {
  const { successfulTutorial } = TutorialStore.getState();
  successfulTutorial && disableTutorialRequest();
};

const handleAuth = async (isAuthorized: boolean, dataReceived: boolean) => {
  if (isAuthorized && !dataReceived) {
    const { worldName } = UserDataStore.getState();
    if (worldName && worldName !== defaultNameValue) {
      await saveUserData({ worldName });
    }

    await waitForAllRequestsIsDone();
    await openWsConnection();
    disablePassedTutorial();
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

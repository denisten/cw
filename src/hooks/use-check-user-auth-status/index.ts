import { useEffect } from 'react';
import { IGetProfile } from '../../api/get-profile';
import { get } from '../../api/requests';
import { apiRoutes } from '../../api';
import {
  enableTutorialMode,
  setTutorialOnAuthorizedUserFlag,
} from '../../effector/tutorial-store/events';
import { editIsAuthorizedFlag } from '../../effector/app-condition/events';
import { statusOk } from '../../constants';
import { setStartLoading } from '../../effector/preloader/events';
import { setUserData } from '../../effector/user-data/events';

export const useCheckUserAuthStatus = () => {
  useEffect(() => {
    const response = get<{ data: IGetProfile }>(apiRoutes.USER_DATA);
    response
      .then(data => {
        if (data.status === statusOk) {
          if (data.data.data.showTutorial) {
            setUserData(data.data.data);
            setTutorialOnAuthorizedUserFlag(true);
            enableTutorialMode();
          } else {
            editIsAuthorizedFlag(true);
          }
        } else {
          enableTutorialMode();
        }
      })
      .finally(() => setStartLoading());
  }, []);
};

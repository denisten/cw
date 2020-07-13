import { useEffect } from 'react';
import { IGetProfile } from '../../api/get-profile';
import { get } from '../../api/requests';
import { apiRoutes } from '../../api';
import { disableTutorialMode } from '../../effector/tutorial-store/events';
import { editIsAuthorizedFlag } from '../../effector/app-condition/events';
import { statusOk } from '../../constants';

export const useCheckUserAuthStatus = () => {
  useEffect(() => {
    const response = get<{ data: IGetProfile }>(apiRoutes.USER_DATA);
    response.then(data => {
      if (data.status === statusOk) {
        disableTutorialMode();
        editIsAuthorizedFlag(true);
      }
    });
  }, []);
};

import { get } from '../requests';
import { apiRoutes } from '..';
import { ISaveUserDataFromBackend } from '../../effector/user-data/events';

export const getProfile = async () => {
  const {
    data: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      data: { name, world_name, assistant_name },
    },
  } = await get(apiRoutes.GET_PROFILE);
  const parsedResponse: ISaveUserDataFromBackend = {
    nickName: name,
    // eslint-disable-next-line @typescript-eslint/camelcase
    cityName: world_name,
    // eslint-disable-next-line @typescript-eslint/camelcase
    supportName: assistant_name,
  };
  return parsedResponse;
};

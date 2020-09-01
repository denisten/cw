import { post } from '../requests';
import { apiRoutes } from '..';

export const showSliderRequest = async () => {
  const response = await post(apiRoutes.CLOSE_SLIDER);
  return response.data;
};

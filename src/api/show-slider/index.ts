import { post } from '../requests';
import { apiRoutes } from '..';

export const showSliderRequest = async () => {
  const response = await post(apiRoutes.SHOW_SLIDER);
  return response.data;
};

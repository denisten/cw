import { get } from '../../requests';
import { apiRoutes } from '../../index';

export const chatTaskSession = async (id: number) => {
  return await get(`${apiRoutes.CHAT_SESSION}/${id}/chat/session`);
};

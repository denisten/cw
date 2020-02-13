import { lcUpdateHandler } from '../lc-update-handler';
import { getUrl } from '../../api';

export const handleAuthButtonClick = async () => {
  window.addEventListener('storage', lcUpdateHandler);
  const authWindow = window.open();
  const { url } = await getUrl();
  if (authWindow) authWindow.location.href = url;
};

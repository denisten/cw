import { getUrl } from '../../api';
import { editIsAuthorizedFlag } from '../../effector/app-condition/events';

export const handleAuthButtonClick = async () => {
  window.addEventListener('storage', () => editIsAuthorizedFlag(true));
  const authWindow = window.open(
    undefined,
    'window_auth',
    'height=500,width=550'
  );
  const { url } = await getUrl();
  if (authWindow) authWindow.location.href = url;
};

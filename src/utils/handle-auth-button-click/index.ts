import { getUrlForAuthorization } from '../../api';

export const handleAuthButtonClick = async () => {
  const authWindow = window.open(
    undefined,
    'window_auth',
    'height=500,width=550'
  );
  const { url } = await getUrlForAuthorization();
  if (authWindow) authWindow.location.href = url;
};

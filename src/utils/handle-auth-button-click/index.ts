import { httpRequestGet, apiRoutes } from '../../api';

export const handleAuthButtonClick = async () => {
  const authWindow = window.open(
    undefined,
    'window_auth',
    'height=500,width=550'
  );
  try {
    const response = await httpRequestGet(apiRoutes.GET_URL);
    const { url } = response.data;
    if (authWindow) authWindow.location.href = url;
  } catch {
    authWindow?.close();
  }
};

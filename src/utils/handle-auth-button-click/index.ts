import { getUrl } from '../../api/get-url';

export const handleAuthButtonClick = async () => {
  const authWindow = window.open(
    undefined,
    'window_auth',
    'height=500,width=550'
  );
  try {
    const url = await getUrl();
    if (authWindow) authWindow.location.href = url;
  } catch (error) {
    authWindow?.close();
  }
};

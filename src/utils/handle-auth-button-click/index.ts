import { getUrlForAuthorization } from '../../api';

export const handleAuthButtonClick = async () => {
  const authWindow = window.open(
    undefined,
    'window_auth',
    'height=500,width=550'
  );
  const responseString = await getUrlForAuthorization();
  if (responseString === 'fail') {
    authWindow?.close();
  } else if (authWindow && responseString)
    authWindow.location.href = responseString;
};

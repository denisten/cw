import { httpRequestGet, apiRoutes } from '../../api';

export const handleAuthButtonClick = async () => {
  try {
    const authWindow = window.open(
      undefined,
      'window_auth',
      'height=500,width=550'
    );

    const response = await httpRequestGet(apiRoutes.GET_URL);
    // const { url } = response.data;
    // if (authWindow) authWindow.location.href = url;
  } catch {
    console.log('dont ok');
  }
  // const authWindow = window.open(
  //   undefined,
  //   'window_auth',
  //   'height=500,width=550'
  // );
  // const responseString = await getUrlForAuthorization();
  // if (responseString === 'fail') {
  //   authWindow?.close();
  // } else if (authWindow && responseString)
  //   authWindow.location.href = responseString;
};

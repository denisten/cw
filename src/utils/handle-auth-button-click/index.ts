import { getUrl } from '../../api/get-url';

export const handleAuthButtonClick = async () => {
  const width = 550;
  const height = 500;
  const left = window.innerWidth / 2 - width / 2;
  const top = window.innerHeight / 2 - height / 2;
  const authWindow = window.open(
    undefined,
    'window_auth',
    `height=${height},width=${width},left=${left}, top=${top}`
  );
  try {
    const url = await getUrl();
    if (authWindow && url) authWindow.location.href = url;
  } catch (error) {
    // console.log(error);
    authWindow?.close();
  }
};

import axios from 'axios';
import { getUrl } from '../get-url';
import { errorParsingHOF } from '../../utils/error-handler';

interface GetUrlProp {
  data: { url: string };
}

export const authorization = async () => {
  const authWindow = window.open(
    undefined,
    'window_auth',
    'height=500,width=550'
  );
  try {
    const url = await getUrl();
    if (authWindow) authWindow.location.href = url;
  } catch (error) {
    console.log('error getUrl');
    authWindow?.close();
  }
};

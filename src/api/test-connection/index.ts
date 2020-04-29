import axios from 'axios';
import Centrifuge from 'centrifuge';

export const testConnection = () => {
  const getCookie = (name: string) => {
    const matches = document.cookie.match(
      new RegExp(
        '(?:^|; )' +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
          '=([^;]*)'
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };
  // console.log(getCookie('XSRF-TOKEN'));

  const centrifuge = new Centrifuge(
    'ws://web.cwmts.local/centrifugo/connection/websocket',
    {
      subscribeEndpoint: '/api/ws/subscribe',
      subscribeHeaders: {
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
      },
    }
  );

  const res = axios.post('/api/ws/connection').then(response => {
    // Connect to centrifugo (websocket server)
    const connectionToken = response.data.data.token;
    centrifuge.setToken(connectionToken);
    centrifuge.connect();
    axios.post('/api/progress/refresh');
    // console.log({ connectionToken });
  });
  // console.log({ res });
};

// var decoded = jwt_decode(connectionToken);

// Subscribe on progress channel personal updates (get response from /api/progress/refresh)
// var subscription = centrifuge.subscribe('progress:updates#' + decoded.sub, function(message) {
//   console.log(message);
//   console.log("success");
// });

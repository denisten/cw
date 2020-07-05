import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, ButtonClassNames } from '../../UI/button';
import { fetchTasks } from '../../effector/missions-store/events';
import { RowWrapper } from '../../UI/row-wrapper';
import { devLogin } from '../../effector/user-data/events';
import { createMockupOfMessages } from '../../effector/chat-messages/events';
import { TowersTypes } from '../../effector/towers-progress/store';
import { TypeOfMarkers } from '../markers';
import { setMarker } from '../../effector/towers-marker/events';
import { devGetCoupons } from '../../api/dev-api/get-coupons';

const DevToolsWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
`;

const createCoinMarkers = () => {
  const mainObj = { type: TypeOfMarkers.TAKE_REWARD, forTesting: true };
  const coinsCollection = [
    {
      towerTitle: TowersTypes.MAIN_TOWER,
      ...mainObj,
    },
    {
      towerTitle: TowersTypes.MOBILE_NETWORK,
      ...mainObj,
    },
    {
      towerTitle: TowersTypes.MY_MTS,
      ...mainObj,
    },
  ];
  coinsCollection.forEach(item => setMarker(item));
};

export const DevTools = () => {
  const [phone, setPhone] = useState('');
  return (
    <DevToolsWrapper>
      <RowWrapper>
        <input
          type="text"
          value={phone}
          onChange={e => {
            setPhone(e.target.value);
          }}
          style={{ marginRight: '100px' }}
        />
        <Button
          className={ButtonClassNames.NORMAL}
          content="Login"
          callback={() => devLogin(phone)}
        />
      </RowWrapper>
    </DevToolsWrapper>
  );
};

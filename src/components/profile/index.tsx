import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import styled from 'styled-components';
import { AppCondition } from '../../effector/app-condition/store';
import { NotAuthorizedProfile } from './not-authorized';
import { AuthorizedProfile } from './authorized';
import { fetchAllProductsData } from '../../effector/towers-progress/events';
import { openWsConnection } from '../../api/centrifuge';
import { progressRefresh } from '../../api';
import { setDataReceived } from '../../effector/app-condition/events';

const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const handleAuth = async (isAuthorized: boolean, dataReceived: boolean) => {
  if (isAuthorized && !dataReceived) {
    await fetchAllProductsData('');
    await openWsConnection();
    await progressRefresh();
    setDataReceived(true);
  }
};

export const Profile = React.memo(() => {
  const { isAuthorized, dataReceived } = useStore(AppCondition);
  useEffect(() => {
    handleAuth(isAuthorized, dataReceived);
  }, [isAuthorized]);
  return (
    <ProfileWrapper>
      {isAuthorized ? <AuthorizedProfile /> : <NotAuthorizedProfile />}
    </ProfileWrapper>
  );
});

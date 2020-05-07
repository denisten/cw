import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import styled from 'styled-components';
import { AppCondition } from '../../effector/app-condition/store';
import { NotAuthorizedProfile } from './not-authorized';
import { AuthorizedProfile } from './authorized';
import { fetchAllProductsData } from '../../effector/towers-progress/events';
import { openWsConnection } from '../../api/centrifuge';

const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const Profile = React.memo(() => {
  const { isAuthorized } = useStore(AppCondition);
  useEffect(() => {
    if (isAuthorized) {
      fetchAllProductsData('');
      openWsConnection();
    }
  }, [isAuthorized]);
  return (
    <ProfileWrapper>
      {isAuthorized ? <AuthorizedProfile /> : <NotAuthorizedProfile />}
    </ProfileWrapper>
  );
});

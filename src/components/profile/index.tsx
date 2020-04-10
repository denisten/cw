import React from 'react';
import { useStore } from 'effector-react';
import styled from 'styled-components';
import { AppCondition } from '../../effector/app-condition/store';
import { NotAuthorizedProfile } from './not-authorized';
import { AuthorizedProfile } from './authorized';

const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const Profile = React.memo(() => {
  const { isAuthorized } = useStore(AppCondition);
  return (
    <ProfileWrapper>
      {!isAuthorized ? <AuthorizedProfile /> : <NotAuthorizedProfile />}
    </ProfileWrapper>
  );
});

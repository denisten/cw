import React from 'react';
import { useStore } from 'effector-react';
import styled from 'styled-components';
import { AppCondition } from '../../effector/app-condition/store';
import { NotAuthorizedProfile } from './not-authorized';
import { AuthorizedProfile } from './authorized';
import { UserDataStore } from '../../effector/user-data/store';
import { useHandleAuth } from '../../hooks/use-handle-auth';

const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const Profile = React.memo(() => {
  const { isAuthorized, dataReceived, openPopUpState } = useStore(AppCondition);
  const { worldName } = useStore(UserDataStore);
  useHandleAuth({ isAuthorized, dataReceived, worldName });

  return (
    <ProfileWrapper>
      {isAuthorized ? (
        <AuthorizedProfile openPopUpState={openPopUpState} />
      ) : (
        <NotAuthorizedProfile openPopUpState={openPopUpState} />
      )}
    </ProfileWrapper>
  );
});

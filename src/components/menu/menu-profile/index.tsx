import React from 'react';
import { useStore } from 'effector-react';
import styled from 'styled-components';
import { AppConditionStore } from '../../../effector/app-condition/store';
import background from './background.svg';
import { NotAuthorizedProfile } from './not-authorized';
import { AuthorizedProfile } from './authorized';

const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: url(${background}) no-repeat center;
  background-size: 100% 100%;
`;

export const Profile = () => {
  const { isAuthorized } = useStore(AppConditionStore);
  return (
    <ProfileWrapper>
      {isAuthorized ? <AuthorizedProfile /> : <NotAuthorizedProfile />}
    </ProfileWrapper>
  );
};

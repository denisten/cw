import React, { lazy, Suspense } from 'react';
import { useStore } from 'effector-react';
import styled from 'styled-components';
import { AppConditionStore } from '../../../effector/app-condition/store';
const AuthorizedProfile = lazy(() => import('./authorized'));
const NotAuthorizedProfile = lazy(() => import('./not-authorized'));
const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const Profile = React.memo(() => {
  const { isAuthorized, openPopUpState } = useStore(AppConditionStore);
  const content = isAuthorized ? (
    <Suspense fallback={<>loading</>}>
      <AuthorizedProfile openPopUpState={openPopUpState} />
    </Suspense>
  ) : (
    <Suspense fallback={<>loading</>}>
      <NotAuthorizedProfile openPopUpState={openPopUpState} />
    </Suspense>
  );
  return <ProfileWrapper>{content}</ProfileWrapper>;
});

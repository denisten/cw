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

export const RowWrapper = styled.div<IRowWrapper>`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: ${props => props.paddingLeft || '0px'};
  margin: ${props => props.margin || '0px'};
  min-height: 52px;
`;

export const ProfileHeaderDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 2.2vh;
  margin: 0 10%;
`;

export const Profile = React.memo(() => {
  const { isAuthorized } = useStore(AppCondition);
  return (
    <ProfileWrapper>
      {isAuthorized ? <AuthorizedProfile /> : <NotAuthorizedProfile />}
    </ProfileWrapper>
  );
});

interface IRowWrapper {
  display?: string;
  paddingLeft?: string;
  margin?: string;
}

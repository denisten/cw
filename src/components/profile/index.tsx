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
import { getIncome, TowersTypesAsObjectLiteral } from '../../api/get-income';
import { setMarker } from '../../effector/towers-marker/events';
import { TypeOfMarkers } from '../markers';
import { TowersTypes } from '../../effector/towers-progress/store';
import { getAccountData } from '../../effector/user-data/events';
import { UserDataStore } from '../../effector/user-data/store';
import { saveUserData } from '../../api/save-user-data';

const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const markersEnumeration = (incomes: TowersTypesAsObjectLiteral) => {
  const iterableArrayOfIncomesData = Object.entries(incomes);
  iterableArrayOfIncomesData.forEach(item => {
    const towerTitle = item[0] as TowersTypes;
    const markerData = {
      towerTitle: towerTitle,
      type: TypeOfMarkers.TAKE_REWARD,
      coins: item[1],
    };
    setMarker(markerData);
  });
};

const handleAuth = async (
  isAuthorized: boolean,
  dataReceived: boolean,
  worldName: string
) => {
  if (isAuthorized && !dataReceived) {
    if (worldName !== 'Неизвестно') {
      await saveUserData({ worldName });
    }
    await fetchAllProductsData('');
    await openWsConnection();
    await progressRefresh();
    await getAccountData('');
    const incomes = await getIncome();
    markersEnumeration(incomes);
    setDataReceived(true);
  }
};

export const Profile = React.memo(() => {
  const { isAuthorized, dataReceived, openPopUpState } = useStore(AppCondition);
  const { worldName } = useStore(UserDataStore);
  useEffect(() => {
    handleAuth(isAuthorized, dataReceived, worldName);
  }, [isAuthorized]);
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

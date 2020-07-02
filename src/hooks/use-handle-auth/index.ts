import { useEffect } from 'react';
import { defaultNameValue } from '../../effector/user-data/store';
import { saveUserData } from '../../api/save-user-data';
import { fetchUserData, getAccountData } from '../../effector/user-data/events';
import { fetchTasks } from '../../effector/missions-store/events';
import { fetchAllProductsData } from '../../effector/towers-progress/events';
import { openWsConnection } from '../../api/centrifuge';
import { progressRefresh } from '../../api';
import { getIncome, TowersTypesAsObjectLiteral } from '../../api/get-income';
import { setDataReceived } from '../../effector/app-condition/events';
import { TowersTypes } from '../../effector/towers-progress/store';
import { TypeOfMarkers } from '../../components/markers';
import { setMarker } from '../../effector/towers-marker/events';
import { fetchUserPurchases } from '../../effector/coupons/events';
import { devGetCoupons } from '../../api/dev-api/get-coupons';

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
  worldName?: string
) => {
  if (isAuthorized && !dataReceived) {
    if (worldName && worldName !== defaultNameValue) {
      await saveUserData({ worldName });
    }
    const { id } = await fetchUserData('');
    await fetchTasks('');
    await fetchAllProductsData('');
    await openWsConnection(id);
    await progressRefresh();
    await getAccountData('');
    await fetchUserPurchases('');
    await devGetCoupons();
    const incomes = await getIncome();
    markersEnumeration(incomes);
    setDataReceived(true);
  }
};

export const useHandleAuth: (args: IuseHandleAuth) => void = ({
  isAuthorized,
  dataReceived,
  worldName,
}) => {
  useEffect(() => {
    handleAuth(isAuthorized, dataReceived, worldName);
  }, [isAuthorized]);
};

interface IuseHandleAuth {
  isAuthorized: boolean;
  dataReceived: boolean;
  worldName: string;
}

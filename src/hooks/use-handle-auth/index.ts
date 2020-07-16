import { useEffect } from 'react';
import { defaultNameValue } from '../../effector/user-data/store';
import { saveUserData } from '../../api/save-user-data';
import { fetchUserData, getAccountData } from '../../effector/user-data/events';
import { fetchTasks } from '../../effector/missions-store/events';
import { fetchAllProductsData } from '../../effector/towers-progress/events';
import { openWsConnection } from '../../api/centrifuge';
import { getIncome, TowersTypesAsObjectLiteral } from '../../api/get-income';
import {
  editTutorialSliderDisplayFlag,
  setDataReceived,
} from '../../effector/app-condition/events';
import { TowersTypes } from '../../effector/towers-progress/store';
import { TypeOfMarkers } from '../../components/markers';
import { setMarker } from '../../effector/towers-marker/events';
import { fetchUserPurchases } from '../../effector/coupons/events';
import { markerHandler } from '../../utils/marker-handler';

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

    await fetchAllProductsData('');
    await openWsConnection(id);
    await getAccountData('');
    await fetchUserPurchases('');
    const incomes = await getIncome();
    await fetchTasks('');
    markersEnumeration(incomes);
    markerHandler();
    setDataReceived(true);
    editTutorialSliderDisplayFlag(true);
  }
};

export const useHandleAuth: (args: IUseHandleAuth) => void = ({
  isAuthorized,
  dataReceived,
  worldName,
}) => {
  useEffect(() => {
    handleAuth(isAuthorized, dataReceived, worldName);
  }, [isAuthorized]);
};

interface IUseHandleAuth {
  isAuthorized: boolean;
  dataReceived: boolean;
  worldName: string;
}

import { TowersTypesAsObjectLiteral } from '../../api/get-income';
import { TowersTypes } from '../../effector/towers-progress/store';
import { TypeOfMarkers } from '../../components/markers';
import { setMarker } from '../../effector/towers-marker/events';

export const markersEnumeration = (incomes: TowersTypesAsObjectLiteral) => {
  const iterableArrayOfIncomesData = Object.entries(incomes);
  iterableArrayOfIncomesData.forEach(item => {
    const towerTitle = item[0] as TowersTypes;
    const markerData = {
      towerTitle,
      type: TypeOfMarkers.TAKE_REWARD,
      coins: item[1],
    };
    setMarker(markerData);
  });
};

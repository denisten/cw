import React, { useMemo } from 'react';
import { useStore } from 'effector-react';
import { TowersProgressStore } from '../../effector/towers-progress/store';
import { planeConfig } from './plane-config';
import { Plane } from './plane';

export const Planes = () => {
  const airportLevelStoreLevel = useStore(TowersProgressStore).roaming.data
    .level.id;
  const planesArray = planeConfig[`level${airportLevelStoreLevel}`] || null;

  return (
    <>
      {planesArray.map(item =>
        useMemo(() => <Plane key={item.id} {...item} />, [item])
      )}
    </>
  );
};

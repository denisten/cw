import React from 'react';
import { useStore } from 'effector-react';
import { TowersProgressStore } from '../../effector/towers-progress/store';
import { planeConfig } from './plane-config';
import { Plane } from './plane';

const Planes = React.memo(() => {
  const airportLevelStoreLevel = useStore(TowersProgressStore).roaming.level
    .level;
  if (airportLevelStoreLevel === 0) {
    return null;
  } else {
    const planesArray = planeConfig[`level${airportLevelStoreLevel}`] || null;
    return (
      <>
        {planesArray.map(item => (
          <Plane key={item.id} {...item} />
        ))}
      </>
    );
  }
});

export default Planes;

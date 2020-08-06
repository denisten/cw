import React from 'react';
import { planeConfig } from './plane-config';
import { Plane } from './plane';

export const Planes: React.FC<IPlanes> = ({ airportLevel }) => {
  if (!airportLevel) return null;
  else {
    return (
      <>
        {planeConfig[`level${airportLevel}`].map(item => (
          <Plane key={item.id} {...item} />
        ))}
      </>
    );
  }
};

interface IPlanes {
  airportLevel: number;
}

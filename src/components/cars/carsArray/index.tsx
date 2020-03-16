import React, { useMemo } from 'react';
import { Car } from '..';
import { carConfig } from '../carConfig';

export const Cars = () => (
  <>
    {carConfig.map(car => {
      return useMemo(() => <Car key={car.id} {...car} />, [car]);
    })}
  </>
);

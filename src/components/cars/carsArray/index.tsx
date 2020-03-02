import React, { useMemo } from 'react';
import { Car } from '..';
import { carConfig } from '../carConfig';

export const Cars = () => (
  <>
    {carConfig.map(car => {
      const carElem = useMemo(() => <Car key={car.id} {...car} />, [car]);
      return carElem;
    })}
  </>
);

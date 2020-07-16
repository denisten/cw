import React, { useMemo } from 'react';
import { Car } from '..';
import { carConfig } from '../carConfig';

const Cars = () => (
  <>
    {carConfig.map(car => {
      return useMemo(() => <Car key={car.id} {...car} />, [car]);
    })}
  </>
);

export default Cars;

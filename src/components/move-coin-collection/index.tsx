import React from 'react';
import { useStore } from 'effector-react';
import { AppCondition } from '../../effector/app-condition/store';
import { MoveCoinElem } from './move-coin-elem';

export const MoveCoinCollection: React.FC = () => {
  const { lootRewardCordinatesQueue } = useStore(AppCondition);

  return (
    <>
      {lootRewardCordinatesQueue.map(elem => (
        <MoveCoinElem key={elem.id} {...elem} />
      ))}
    </>
  );
};

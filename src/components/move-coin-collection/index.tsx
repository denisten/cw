import React from 'react';
import { useStore } from 'effector-react';
import { MoveCoinElem } from './move-coin-elem';
import { RewardStore } from '../../effector/reward/store';

export const MoveCoinCollection: React.FC = () => {
  const { lootRewardCordinatesQueue } = useStore(RewardStore);

  return (
    <>
      {lootRewardCordinatesQueue.map(elem => (
        <MoveCoinElem key={elem.id} {...elem} />
      ))}
    </>
  );
};

import React from 'react';
import { useStore } from 'effector-react';
import { MoveCoinElem } from './move-coin-elem';
import { RewardStore } from '../../effector/reward/store';

const MoveCoinCollection: React.FC = () => {
  const { lootRewardCoordinatesQueue } = useStore(RewardStore);
  return (
    <>
      {lootRewardCoordinatesQueue.map(elem => (
        <MoveCoinElem key={elem.id} {...elem} />
      ))}
    </>
  );
};
export default MoveCoinCollection;

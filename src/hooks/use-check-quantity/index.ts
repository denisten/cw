import { useEffect } from 'react';

export const useCheckQuantity = (
  quantity: number,
  callBack: (arg: number) => void
) => {
  useEffect(() => {
    !quantity && callBack(1);
  }, [quantity]);
};

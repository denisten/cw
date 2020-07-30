import { useEffect } from 'react';

export const useCheckQuantity = (
  quantity: number,
  callBack: (arg: number) => void
) => {
  useEffect(() => {
    if (quantity === 0) {
      callBack(1);
    }
  }, [quantity]);
};

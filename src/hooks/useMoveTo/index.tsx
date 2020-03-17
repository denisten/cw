import React, { useState } from 'react';

export const useMoveTo = () => {
  const [state, setState] = useState({ left: 0, width: 0 });
  const handleMouseClick = (e: React.MouseEvent) => {
    e.persist();
    const target = e.target as HTMLDivElement;
    setState(state => ({
      ...state,
      left: target.offsetLeft,
      width: target.offsetWidth,
    }));
  };
  return {
    left: state.left,
    width: state.width,
    handleMouseClick,
  };
};

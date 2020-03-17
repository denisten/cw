import React, { useState, useEffect } from 'react';

export const useMoveTo = (initWidth: number) => {
  const [state, setState] = useState({
    left: 0,
    width: 0,
    hLeft: -1,
    hWidth: -1,
  });
  useEffect(() => {
    setState(state => ({
      ...state,
      width: initWidth,
    }));
  }, [initWidth]);
  const handleMouseClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    e.persist();
    setState(state => ({
      ...state,
      left: target.offsetLeft,
      width: target.offsetWidth,
    }));
  };
  const handleMouseOver = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    e.persist();
    setState(state => ({
      ...state,
      hLeft: target.offsetLeft,
      hWidth: target.offsetWidth,
    }));
  };
  const handleMouseOut = () => {
    setState(state => ({
      ...state,
      hLeft: -1,
      hWidth: -1,
    }));
  };
  return {
    left: state.left,
    width: state.width,
    hLeft: state.hLeft,
    hWidth: state.hWidth,
    handleMouseOver,
    handleMouseOut,
    handleMouseClick,
  };
};

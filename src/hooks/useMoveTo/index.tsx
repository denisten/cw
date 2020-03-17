import React, { useState } from 'react';

export const useMoveTo = (initWidth: number) => {
  const [state, setState] = useState({
    left: 0,
    width: initWidth,
    hLeft: 0,
    hWidth: 0,
    hovered: false,
  });
  // * передаю элемент DOMa, так как в туториал-моде по клику далее необходимо двигать полосочку
  const handleMouseClick = (target: HTMLDivElement | null) => {
    if (!target) return;
    setState(state => ({
      ...state,
      left: target.offsetLeft,
      width: target.offsetWidth,
    }));
  };
  const handleMouseOver = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    setState(state => ({
      ...state,
      hLeft: target.offsetLeft,
      hWidth: target.offsetWidth,
      hovered: true,
    }));
  };
  const handleMouseOut = () => {
    setState(state => ({
      ...state,
      hovered: false,
    }));
  };
  return {
    left: state.left,
    width: state.width,
    hLeft: state.hLeft,
    hWidth: state.hWidth,
    hovered: state.hovered,
    handleMouseOver,
    handleMouseOut,
    handleMouseClick,
  };
};

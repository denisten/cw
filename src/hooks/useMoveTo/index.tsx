import React, { useState, useRef, useEffect } from 'react';

export const useMoveTo = (initWidth: number) => {
  const moveElem = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState({
    left: 0,
    width: initWidth,
    hLeft: 0,
    hWidth: 0,
    hovered: false,
  });

  const handleMouseClick = (target: HTMLDivElement | null) => {
    if (!target) return;
    setState(state => ({
      ...state,
      left: target.offsetLeft,
      width: target.offsetWidth,
    }));

    moveElem.current = target;
  };

  const setNewMoveDataInResize = () => {
    if (moveElem.current) {
      setTimeout(() => {
        handleMouseClick(moveElem.current);
      }, 1000);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', setNewMoveDataInResize);
    return () => {
      window.removeEventListener('resize', setNewMoveDataInResize);
    };
  }, []);

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

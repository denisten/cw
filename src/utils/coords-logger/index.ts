import React from 'react';

export const coordsLogger = (
  e: React.MouseEvent,
  container: HTMLDivElement
) => {
  if (container) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { x, y } = container.getBoundingClientRect();
    // console.log([Math.abs(x) + e.clientX, Math.abs(y) + e.clientY]);
    // TODO: Используй, когда нужно поставить новое здание
  }
};

import React from 'react';

export const svgFilter = (
  <svg>
    <filter id="turbulence" x="0" y="0" width="100%" height="100%">
      <feTurbulence
        id="sea-filter"
        numOctaves="3"
        seed="2"
        baseFrequency="0.02 0.05"
      ></feTurbulence>
      <feDisplacementMap scale="20" in="SourceGraphic"></feDisplacementMap>
      <animate
        xlinkHref="#sea-filter"
        attributeName="baseFrequency"
        dur="6s"
        keyTimes="0;0.5;1"
        values="0.02 0.05; 0.04 0.07; 0.06 0.09"
        repeatCount="indefinite"
      />
    </filter>
  </svg>
);

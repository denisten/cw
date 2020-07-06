import React from 'react';
export const Challenge: React.FC<{ active: boolean }> = ({ active }) => (
  <div hidden={!active}>В разработке</div>
);

import React from 'react';
export const Mission: React.FC<{ active: boolean }> = ({ active }) => (
  <div hidden={!active}>mission</div>
);

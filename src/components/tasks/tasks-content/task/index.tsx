import React from 'react';

export const Task: React.FC<{ active: boolean }> = ({ active }) => (
  <div hidden={!active}>task</div>
);

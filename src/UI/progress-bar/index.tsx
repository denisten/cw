import React from 'react';
import styled from 'styled-components';

const ProgressBarWrapper = styled.div`
  display: flex;
  height: 30%;
  width: 100%;
  border: 1px solid;
  border-radius: 50px;
  overflow: hidden;
  justify-content: flex-start;
  .first {
    width: 33%;
    height: 100%;
    border-radius: 4px;
    background-color: #5ee220;
`;

export const ProgressBar = () => {
  return (
    <ProgressBarWrapper>
      <ProgressBarWrapper className="first" />
    </ProgressBarWrapper>
  );
};

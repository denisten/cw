import React from 'react';
import styled from 'styled-components';

const ProgressBarWrapper = styled.div`
  position: relative;
  display: flex;
  height: 30%;
  width: 100%;
  border: 1px solid;
  border-radius: 4px;
  overflow: hidden;
  justify-content: flex-start;
`;

const ProgressBarGreenLine = styled.div<ProgressBarProps>`
  width: ${props => props.progress}%;
  height: 100%;
  background-color: #5ee220;
  transition-property: width;
  transition-duration: 0.4s;
  transition-timing-function: ease-in-out;
`;

const ProgressSpanWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

type ProgressBarProps = {
  progress?: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <ProgressBarWrapper>
      <ProgressBarGreenLine progress={progress} />
      <ProgressSpanWrapper>{progress}%</ProgressSpanWrapper>
    </ProgressBarWrapper>
  );
};

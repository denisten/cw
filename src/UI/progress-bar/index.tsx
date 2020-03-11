import React from 'react';
import styled from 'styled-components';

const ProgressBarWrapper = styled.div`
  position: relative;
  display: flex;
  height: 20px;
  width: 180px;
  border: 1px solid;
  border-radius: 100px;
  overflow: hidden;
  justify-content: flex-start;
  margin-top: 4px;
  background-color: #e2e5eb;

  &::before {
    position: absolute;
    width: 3px;
    height: 100%;
    background-color: white;
    content: '';
    top: 0;
    left: 33%;
  }
  &::after {
    position: absolute;
    width: 3px;
    height: 100%;
    background-color: white;
    content: '';
    top: 0;
    left: 66%;
  }
`;

const ProgressBarGreenLine = styled.div<ProgressBarProps>`
  width: ${props => props.progress}%;
  height: 100%;
  background-image: linear-gradient(to left, #64e2ff, #02adc9);
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
    </ProgressBarWrapper>
  );
};

import React from 'react';
import styled from 'styled-components';

const ProgressBarWrapper = styled.div`
  position: relative;
  display: flex;
  height: 20px;
  width: 188px;
  border: 1px solid none;
  overflow: hidden;
  justify-content: flex-start;
  background-color: #d6f0f4;
  border: 1px solid none;
  transform: skew(-32deg);
  border-radius: 8px;
  box-shadow: inset 0 0 2px 0 rgba(32, 189, 218, 0.18);

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

  box-shadow: inset 0 1px 3px 0 rgba(255, 255, 255, 0.5);

  background-image: linear-gradient(
    to bottom,
    #5adcf9,
    #43d0ed 40%,
    #3acbe8 44%,
    #5edffc
  );
  transition-property: width;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
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

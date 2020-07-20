import styled from 'styled-components';

export const ProgressBar = styled.div`
  width: 135px;
  height: 14px;
  border-radius: 5.8px;
  box-shadow: inset 0 0 1px 0 rgba(32, 189, 218, 0.18);
  background-color: #d6f0f4;
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    width: 55px;
    height: 14px;
    border-radius: 5.8px;
    box-shadow: inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
    background-image: linear-gradient(
      to bottom,
      #5adcf9,
      #43d0ed 40%,
      #3acbe8 44%,
      #5edffc
    );
  }
`;

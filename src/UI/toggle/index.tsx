import React from 'react';
import styled from 'styled-components';

const ToggleBody = styled.div<{ enable: boolean }>`
  cursor: pointer;
  width: 70px;
  height: 14px;
  background: ${props => (props.enable ? '#D6F0F4' : '#E7E8E9')};
  transform: skew(-30deg);
  position: relative;

  &::before {
    content: '';
    width: 50%;
    height: 100%;
    background: #02acc8;
    top: 0;
    left: ${props => (props.enable ? '50%' : '0%')};
    position: absolute;
    transition: 0.4s;
  }
`;

export const Toggle: React.FC<IToggle> = ({ state, callBack }) => {
  return (
    <>
      <ToggleBody enable={state} onClick={callBack} />
    </>
  );
};

interface IToggle {
  state: boolean;
  callBack?: () => void;
}

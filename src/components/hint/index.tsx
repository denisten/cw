import React from 'react';
import styled from 'styled-components';
import { MTSSans } from '../../fonts';

export const HintWrapper = styled.div`
  font-family: ${MTSSans.REGULAR};
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  align-items: center;
  letter-spacing: -0.4px;
  text-decoration-line: underline;
  cursor: pointer;
  color: #03adc9;
  ::after {
    content: 'Использовать купон';
  }
`;

export const Hint: React.FC<IHint> = ({ callback }) => {
  return <HintWrapper onClick={e => callback(e)} />;
};

interface IHint {
  callback: Function;
}

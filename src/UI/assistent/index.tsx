import React from 'react';
import styled from 'styled-components';
import assistentAvatar from './ava.svg';
import { MTSSans } from '../../fonts';
import { RowWrapper } from '../row-wrapper';

const AssistentWrapper = styled.div<IAssistentStyle>`
  width: auto;
  height: auto;
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  display: flex;
  align-items: center;
  flex-direction: column;

  span {
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #02adc9;
    font-family: ${MTSSans.REGULAR};
    white-space: nowrap;
  }
`;
const AssistentAvatar = styled.img`
  width: 64px;
  height: 64px;
  margin-bottom: 5px;
`;

export const Assistent: React.FC<IAssistent> = ({ assistentStyle }) => {
  return (
    <AssistentWrapper {...assistentStyle}>
      <AssistentAvatar src={assistentAvatar} alt="assistent" />
      <span>Робот помощник</span>
      <RowWrapper>sss</RowWrapper>
    </AssistentWrapper>
  );
};
interface IAssistent {
  assistentStyle: IAssistentStyle;
}

interface IAssistentStyle {
  left: string;
  top: string;
}

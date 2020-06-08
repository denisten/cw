import React from 'react';
import styled from 'styled-components';
import assistentAvatar from './ava.svg';
import { MTSSans } from '../../fonts';
import { RowWrapper } from '../row-wrapper';
import penImg from '../../components/profile/not-authorized/pen.svg';

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

const Title = styled.div`
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.6px;
  color: #001424;
  font-family: ${MTSSans.BOLD};
  margin-right: 10px;
  max-width: 150px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const penStyleConfig = {
  cursor: 'pointer',
} as React.CSSProperties;

export const Assistent: React.FC<IAssistent> = ({
  assistantStyle,
  assistantName,
  callBack,
}) => {
  return (
    <AssistentWrapper {...assistantStyle}>
      <AssistentAvatar src={assistentAvatar} alt="assistent" />
      <span>Робот помощник</span>
      <RowWrapper>
        <Title>{assistantName}</Title>
        <img src={penImg} alt="pen" style={penStyleConfig} onClick={callBack} />
      </RowWrapper>
    </AssistentWrapper>
  );
};
interface IAssistent {
  assistantStyle: IAssistentStyle;
  assistantName: string;
  callBack: () => void;
}

interface IAssistentStyle {
  left: string;
  top: string;
}

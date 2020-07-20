import React from 'react';
import styled from 'styled-components';
import assistantAvatar from './ava.svg';
import { MTSSans } from '../../fonts';
import { RowWrapper } from '../row-wrapper';
import penImg from '../../components/menu/menu-profile/not-authorized/pen.svg';

const AssistantWrapper = styled.div<IAssistantStyle>`
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
const AssistantAvatar = styled.img`
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
  cursor: pointer;
`;

const penStyleConfig = {
  cursor: 'pointer',
  marginLeft: '12px',
  position: 'absolute',
} as React.CSSProperties;

export const Assistant: React.FC<IAssistant> = ({
  assistantStyle,
  assistantName,
  callBack,
}) => {
  return (
    <AssistantWrapper {...assistantStyle}>
      <AssistantAvatar src={assistantAvatar} alt="assistant" />
      <span>Робот помощник</span>
      <RowWrapper>
        <Title onClick={callBack}>
          {assistantName}
          <img src={penImg} alt="pen" style={penStyleConfig} />
        </Title>
      </RowWrapper>
    </AssistantWrapper>
  );
};
interface IAssistant {
  assistantStyle: IAssistantStyle;
  assistantName: string;
  callBack: () => void;
}

interface IAssistantStyle {
  left: string;
  top: string;
}

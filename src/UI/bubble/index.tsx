import React from 'react';
import styled from 'styled-components';
import wCorner from './corner-white.svg';
import bCorner from './corner-b.svg';
import { MTSSans } from '../../fonts';
import { MessagesDirection } from '../../api/tasks/session';

const BubbleBody = styled.div<{ direction?: string }>`
  margin: ${props =>
    props.direction === MessagesDirection.INCOMING ? '0 0 0 8px' : '0 8px 0 0'};
  background-color: ${props =>
    props.direction === MessagesDirection.INCOMING ? 'white' : '#04B5D2'};
  border-radius: 4px;
  padding: ${props =>
    props.direction === MessagesDirection.INCOMING
      ? '12px 41px 12px 29px'
      : '22px 41px 22px 24px'};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 11px 0 #e2e5eb;
  position: relative;
  max-width: 323px;

  span {
    font-family: ${MTSSans.REGULAR};
    font-size: 16px;
    line-height: 1.25;
    color: ${props =>
      props.direction === MessagesDirection.INCOMING ? '#001424' : 'white'};
  }

  &::before {
    content: '';
    position: absolute;
    background: url(${wCorner}) no-repeat center;
    bottom: 0;
    left: -6px;
    width: 38px;
    height: 32px;
    display: ${props =>
      props.direction === MessagesDirection.INCOMING ? 'block' : 'none'};
  }

  &::after {
    content: '';
    position: absolute;
    background: url(${bCorner}) no-repeat center;
    bottom: 0;
    right: -6px;
    width: 38px;
    height: 32px;
    display: ${props =>
      props.direction === MessagesDirection.OUTGOING ? 'block' : 'none'};
  }
`;

const BotName = styled.div<{ content: string }>`
  height: 20px;
  font-family: ${MTSSans.REGULAR};
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: #02adc9;
  ::after {
    content: "${props => props.content}";
  }
`;

export const Bubble: React.FC<IBubble> = ({ direction, text, botName }) => {
  return (
    <BubbleBody direction={direction}>
      {direction === MessagesDirection.OUTGOING && botName && (
        <BotName content={botName} />
      )}
      <span>{text}</span>
    </BubbleBody>
  );
};

interface IBubble {
  direction: string;
  text: string;
  botName?: string;
}

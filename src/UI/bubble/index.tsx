import React from 'react';
import styled from 'styled-components';
import wCorner from './corner-white.svg';
import bCorner from './corner-b.svg';

const BubbleBody = styled.div<{ type?: string }>`
  margin: ${props => (props.type === 'system' ? '0 0 0 8px' : '0 8px 0 0')};
  background-color: ${props => (props.type === 'system' ? 'white' : '#04B5D2')};
  border-radius: 4px;
  padding: ${props =>
    props.type === 'system' ? '12px 41px 12px 29px' : '22px 41px 22px 24px'};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 11px 0 #e2e5eb;
  position: relative;

  span {
    font-family: MTSSans;
    font-size: 16px;
    line-height: 1.25;
    color: ${props => (props.type === 'system' ? '#001424' : 'white')};
  }

  &::before {
    content: '';
    position: absolute;
    background: url(${wCorner}) no-repeat center;
    bottom: 0;
    left: -6px;
    width: 38px;
    height: 32px;
    display: ${props => (props.type === 'system' ? 'block' : 'none')};
  }

  &::after {
    content: '';
    position: absolute;
    background: url(${bCorner}) no-repeat center;
    bottom: 0;
    right: -6px;
    width: 38px;
    height: 32px;
    display: ${props => (props.type === 'user' ? 'block' : 'none')};
  }
`;

const BotName = styled.div`
  height: 20px;
  font-family: MTSSans;
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: #02adc9;
`;

export const Bubble: React.FC<IBubble> = ({ type, text, botName }) => {
  return (
    <BubbleBody type={type}>
      {type === 'system' && botName && <BotName>{botName}</BotName>}
      <span>{text}</span>
    </BubbleBody>
  );
};

interface IBubble {
  type: string;
  text: string;
  botName?: string;
}

import React from 'react';
import styled from 'styled-components';
import { Icon, TypeOfIcons } from '../icons';
import { MTSSans } from '../../fonts';

const ChatPreviewWrapper = styled.div`
  height: 498px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid #e2e5eb;
`;

const Title = styled.span`
  font-size: 32px;
  line-height: 40px;
  font-family: ${MTSSans.BOLD};
  letter-spacing: -0.5px;
  color: #001424;
  margin: 8px 0;
`;

const DescriptionText = styled.span`
  font-size: 16px;
  line-height: 20px;
  color: #001424;
  opacity: 0.6;
  width: 375px;
`;

export const ChatPreview = () => {
  return (
    <ChatPreviewWrapper>
      <Icon type={TypeOfIcons.CHAT} />
      <Title>Это чат</Title>
      <DescriptionText>
        Чат предназначен для выполнения заданий и прохождения викторин
      </DescriptionText>
    </ChatPreviewWrapper>
  );
};

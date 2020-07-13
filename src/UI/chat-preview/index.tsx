import React from 'react';
import styled from 'styled-components';
import { Icon, TypeOfIcons } from '../icons';
import { MTSSans } from '../../fonts';
import { useStore } from 'effector-react';
import { TutorialStore } from '../../effector/tutorial-store/store';

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
  const { tutorialCondition } = useStore(TutorialStore);
  return (
    <ChatPreviewWrapper>
      <Icon type={TypeOfIcons.CHAT} />
      <Title>Это чат</Title>
      <DescriptionText>
        {tutorialCondition
          ? `Здесь вы найдёте помощника, который готов помочь с любой задачей!`
          : `Чат предназначен для выполнения заданий и прохождения викторин`}
      </DescriptionText>
    </ChatPreviewWrapper>
  );
};

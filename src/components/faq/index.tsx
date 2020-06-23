import React from 'react';
import styled from 'styled-components';
import { FAQItem } from './faq-item';
import { faqText } from './faq-text';

const FAQBody = styled.div`
  width: 100%;
  height: 100%;
  padding: 64px 20px 0 70px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    width: 100%;
    height: 80px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      #ffffff 86.46%
    );
  }
`;

const FAQScroll = styled.div`
  overflow: auto;
  width: 100%;
  height: 100%;
  flex-direction: column;
  display: flex;

  div:last-child {
    z-index: 2;
  }
`;
export const Faq: React.FC = () => {
  return (
    <FAQBody>
      <FAQScroll>
        {faqText.map((faq, ind) => (
          <FAQItem key={ind} {...faq} />
        ))}
      </FAQScroll>
    </FAQBody>
  );
};

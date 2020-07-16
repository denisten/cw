import React from 'react';
import { ScrollContainer } from '../faq';
import styled from 'styled-components';
import { MTSSans } from '../../../fonts';

const OfferWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
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

const OfferTitle = styled.span`
  font-family: ${MTSSans.BOLD};
  font-size: 24px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.6px;
  color: #001424;
  margin-top: 60px;
  margin-bottom: 25px;
  flex-shrink: 0;
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: #d9d9d9;
  margin-bottom: 25px;
  flex-shrink: 0;
`;

const OfferScrollContainer = styled(ScrollContainer)`
  padding: 0 112px;
  span {
    font-size: 16px;
    line-height: 24px;
    color: #202d3d;
  }
  span:last-child {
    z-index: 2;
    padding-bottom: 20px;
  }
`;

export const Offer: React.FC = () => {
  return (
    <OfferWrapper>
      <OfferTitle>Оферта</OfferTitle>
      <Divider />
      <OfferScrollContainer>
        <span>
          Оферта — это предложение конкретных условий сотрудничества.
          Предложение руки и сердца — это оферта определенному человеку создать
          семью с общим имуществом. Предложение товара на витрине — это
          публичная оферта купить этот товар в этом магазине на конкретных
          условиях. Оферта — это предложение конкретных условий сотрудничества.
          Предложение руки и сердца — это оферта определенному человеку создать
          семью с общим имуществом. Предложение товара на витрине — это
          публичная оферта купить этот товар в этом магазине на конкретных
          условиях. Оферта — это предложение конкретных условий сотрудничества.
          Предложение руки и сердца — это оферта определенному человеку создать
          семью с общим имуществом. Предложение товара на витрине — это
          публичная оферта купить этот товар в этом магазине на конкретных
          условиях. Оферта — это предложение конкретных условий сотрудничества.
        </span>
        <span>
          Предложение руки и сердца — это оферта определенному человеку создать
          семью с общим имуществом. Предложение товара на витрине — это
          публичная оферта купить этот товар в этом магазине на конкретных
          условиях.
        </span>
      </OfferScrollContainer>
    </OfferWrapper>
  );
};

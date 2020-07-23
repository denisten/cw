import React from 'react';
import styled from 'styled-components';
import logo from './logo.svg';
import { MTSSans } from '../../../../fonts';

export const WrapperBlock = styled.div`
  box-sizing: border-box;
  padding: 30px 70px 0px 45px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  width: 100%;
  height: 210px;
  background: #f3f6f8;
  position: relative;
  margin: 30px 0 70px 0;

  &::before {
    content: '';
    width: 347px;
    height: 290px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: url(${logo});
  }
`;

const LegendSection = styled.section`
  width: 100%;
  margin-bottom: 40px;
  display: grid;

  span {
    font-size: 18px;
    line-height: 25px;
    color: #001424;
  }

  span:first-child {
    font-family: ${MTSSans.BOLD};
    font-size: 36px;
    line-height: 49px;
    color: #001424;
    margin-bottom: 15px;
  }
`;

const content = [
  {
    title: 'Ценности',
    text:
      'В жизни мы окружаем себя ценными и дорогими вещами. Речь сейчас не о материальной ценности, а о чем-то большем. Мы собираем собственный мир из близких сердцу мелочей, важных деталей, неуловимых пустяков.',
  },
  {
    title: 'Комфорт',
    text:
      'Создавайте свой комфорт, выбирайте, что важно и нужно именно вам. Постройте свой идеальный мир, изучите внимательно каждый его уголок. Внутри вас ждут сюрпризы, персональные челленджи и прогресс. Развивайтесь, творите, меняйтесь. Делайте лучше себя и мир вокруг.',
  },
  {
    title: '27 лет',
    text:
      'МТС уже 27 лет думает о том, чтобы все важные моменты были рядом с тобой. Родные и близкие на расстоянии звонка. Любимая музыка, новинки кино, захватывающие бестселлеры и вечная классика литературы, программы тренировок и рецепты на любой случай – все это уже сейчас в твоем кармане.',
  },
];

export const EncyclopediaLegendBlock = () => {
  return (
    <WrapperBlock>
      <Header />
      {content.map((contentElem, ind) => (
        <LegendSection key={ind}>
          <span>{contentElem.title}</span>
          <span>{contentElem.text}</span>
        </LegendSection>
      ))}
    </WrapperBlock>
  );
};

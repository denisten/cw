import React from 'react';
import styled from 'styled-components';
import { MTSSans } from '../../../../fonts';
import legend1 from './legend1.svg';
import legend2 from './legend2.svg';
import legend3 from './legend3.svg';
export const WrapperBlock = styled.div`
  box-sizing: border-box;
  padding: 30px 40px 0 45px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const LegendSection = styled.section`
  width: 100%;
  margin-bottom: 20px;
  display: grid;

  span {
    font-size: 18px;
    line-height: 25px;
    color: #001424;
  }

  span:nth-child(2) {
    font-family: ${MTSSans.BOLD};
    font-size: 36px;
    line-height: 49px;
    color: #001424;
    margin-bottom: 15px;
  }
`;

const LegendImg = styled.img.attrs({ alt: 'legend' })`
  width: 100%;
  height: 355px;
`;

const content = [
  {
    img: legend1,
    title: 'Ценности',
    text:
      'В жизни мы окружаем себя ценными и дорогими вещами. Речь сейчас не о материальной ценности, а о чем-то большем. Мы собираем собственный мир из близких сердцу мелочей, важных деталей, неуловимых пустяков.',
  },
  {
    img: legend2,
    title: 'Комфорт',
    text:
      'Создавайте свой комфорт, выбирайте, что важно и нужно именно вам. Постройте свой идеальный мир, изучите внимательно каждый его уголок. Внутри вас ждут сюрпризы, персональные челленджи и прогресс. Развивайтесь, творите, меняйтесь. Делайте лучше себя и мир вокруг.',
  },
  {
    img: legend3,
    title: '27 лет',
    text:
      'МТС уже 27 лет думает о том, чтобы все важные моменты были рядом с тобой. Родные и близкие на расстоянии звонка. Любимая музыка, новинки кино, захватывающие бестселлеры и вечная классика литературы, программы тренировок и рецепты на любой случай – все это уже сейчас в твоем кармане.',
  },
];

export const EncyclopediaLegendBlock = () => {
  return (
    <WrapperBlock>
      {content.map((contentElem, ind) => (
        <LegendSection key={ind}>
          <LegendImg src={contentElem.img} />
          <span>{contentElem.title}</span>
          <span>{contentElem.text}</span>
        </LegendSection>
      ))}
    </WrapperBlock>
  );
};

import React from 'react';
import { WrapperBlock } from '../legend-block';
import styled from 'styled-components';
import iconsblock from './iconsblock.svg';
const Text = styled.span`
  font-size: 18px;
  line-height: 25px;
  color: #001424;
`;

const IconsBlock = styled.img`
  width: 100%;
  height: 210px;
  margin: 40px 0;
`;

const HintsBlock = styled.section`
  display: grid;
  width: 100%;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
`;

export const EncyclopediaHintsBlock = () => {
  return (
    <WrapperBlock>
      <Text>
        Ваши помощники не дремлют. Если что-то происходит в городе пока вас нет,
        они расставляют подсказки. По этим подсказкам легко сориентироваться и
        начать выполнять ежедневные дела!
      </Text>
      <IconsBlock alt="iconsblock" src={iconsblock} />
      <HintsBlock></HintsBlock>
    </WrapperBlock>
  );
};

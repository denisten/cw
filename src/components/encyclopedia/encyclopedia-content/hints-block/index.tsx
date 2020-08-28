import React from 'react';
import { WrapperBlock } from '../legend-block';
import styled from 'styled-components';
import iconsblock from './iconsblock.svg';
import { MarkerTypes } from '../../../markers';
import { Icon } from '../../../../UI/icons';
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

const HintsSection = styled.section`
  display: grid;
  width: 100%;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 20px;
`;

const HintBlock = styled.div`
  font-size: 18px;
  line-height: 25px;
  color: #001424;
  display: flex;
  margin-bottom: 28px;
  box-sizing: border-box;

  img {
    margin-right: 24px;
    flex-shrink: 0;
  }

  &:nth-child(even) {
    padding-left: 20px;
  }
  &:nth-child(odd) {
    padding-right: 20px;
  }
`;

const styleConfig = {
  icon: {
    width: '39px',
    height: '50px',
  },
};

const content = [
  {
    iconType: MarkerTypes.TASK,
    text: 'Этот значок показывает, что в этом здании есть не решенные дела.',
  },
  {
    iconType: MarkerTypes.UPGRADE_TOWER,
    text: 'А вот этот значок говорит, что здание готово к усовершенствованию!',
  },
  {
    iconType: MarkerTypes.SUCCESS,
    text: 'Этот маркер показывает, что нужно забрать награду.',
  },
  {
    iconType: MarkerTypes.PLAY,
    text: 'Если вы увидите джойстик, значит, появилась новая игра!',
  },
];
export const EncyclopediaHintsBlock = () => {
  return (
    <WrapperBlock>
      <Text>
        Ваши помощники не дремлют. Если что-то происходит в городе пока вас нет,
        они расставляют подсказки. По этим подсказкам легко сориентироваться и
        начать выполнять ежедневные дела!
      </Text>
      <IconsBlock alt="iconsblock" src={iconsblock} />
      <HintsSection>
        {content.map((hintElem, ind) => (
          <HintBlock key={ind}>
            <Icon type={hintElem.iconType} style={styleConfig.icon} />
            <span>{hintElem.text}</span>
          </HintBlock>
        ))}
      </HintsSection>
    </WrapperBlock>
  );
};

import React from 'react';
import styled from 'styled-components';
import {
  IEncyclopediaItemConfig,
  encyclopediaItemsList,
  EncyclopediaItem,
} from '..';
import actArrowLeft from './actArrowLeft.svg';
import actArrowRight from './actArrowRight.svg';
import arrowLeft from './arrowLeft.svg';
import arrowRight from './arrowRight.svg';
import { EncyclopediaLegendBlock } from './legend-block';
import { EncyclopediaHintsBlock } from './hints-block';
import { MTSSans } from '../../../fonts';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  box-sizing: border-box;
  margin: 40px 48px 0 48px;
  flex-shrink: 0;
  border-bottom: 1px solid #a5b2b7;
`;

const Title = styled.span`
  font-family: ${MTSSans.BOLD};
  font-size: 48px;
  line-height: 66px;
  color: #001424;
`;

const Slider = styled.div`
  padding-bottom: 8px;
  display: flex;
  align-items: center;
`;

const ContentSection = styled.section`
  width: 100%;
  height: 100%;
  overflow: auto;
  width: calc(100% - 35px);
`;

const disableArrowClassName = 'disable';

const Arrow = styled.div<IArrow>`
  width: 32px;
  height: 32px;
  background: url(${props => props.background}) no-repeat center;
  background-size: 11px 18px;
  cursor: pointer;
  margin: 0px 13px;

  &.${disableArrowClassName} {
    background: url(${props => props.disableBackground}) no-repeat center;
    background-size: 11px 18px;
    pointer-events: none;
  }
`;

const ContentSelector: React.FC<IContentSelector> = ({ activeItem }) => {
  switch (activeItem?.id) {
    case EncyclopediaItem.LEGEND:
      return <EncyclopediaLegendBlock />;

    case EncyclopediaItem.HINTS:
      return <EncyclopediaHintsBlock />;

    default:
      return <></>;
  }
};

export const EncyclopediaContent: React.FC<IEncyclopediaContent> = ({
  activeItem,
  activeIndex,
  callBack,
}) => {
  const isFirstElem = activeIndex === 0;
  const isLastElem = activeIndex === encyclopediaItemsList.length - 1;
  return (
    <Wrapper>
      <Header>
        <Slider>
          <Arrow
            background={actArrowLeft}
            disableBackground={arrowLeft}
            className={isFirstElem ? disableArrowClassName : ''}
            onClick={() => callBack(encyclopediaItemsList[activeIndex - 1].id)}
          />
          <Title>{activeItem?.label}</Title>
          <Arrow
            background={actArrowRight}
            disableBackground={arrowRight}
            className={isLastElem ? disableArrowClassName : ''}
            onClick={() => callBack(encyclopediaItemsList[activeIndex + 1].id)}
          />
        </Slider>
      </Header>
      <ContentSection>
        <ContentSelector activeItem={activeItem} />
      </ContentSection>
    </Wrapper>
  );
};

interface IEncyclopediaContent extends IContentSelector {
  activeIndex: number;
  callBack: (arg: EncyclopediaItem) => void;
}

interface IArrow {
  background: string;
  disableBackground: string;
}

interface IContentSelector {
  activeItem: IEncyclopediaItemConfig | undefined;
}

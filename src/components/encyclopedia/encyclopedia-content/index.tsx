import React from 'react';
import styled from 'styled-components';
import { IEncyclopediaItemConfig, encyclopediaItemsList } from '..';
import actArrowLeft from './actArrowLeft.svg';
import actArrowRight from './actArrowRight.svg';
import arrowLeft from './arrowLeft.svg';
import arrowRight from './arrowRight.svg';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const Header = styled.header`
  width: 100%;
  box-sizing: border-box;
  padding: 40px 0 0 28px;
`;

const Title = styled.span`
  font-weight: 900;
  font-size: 48px;
  line-height: 66px;
  color: #001424;
`;

const Slider = styled.div`
  padding-bottom: 8px;
  display: flex;
  align-items: center;
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

export const EncyclopediaContent: React.FC<IEncyclopediaContent> = ({
  activeItem,
  activeIndex,
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
          />
          <Title>{activeItem?.label}</Title>
          <Arrow
            background={actArrowRight}
            disableBackground={arrowRight}
            className={isLastElem ? disableArrowClassName : ''}
          />
        </Slider>
      </Header>
    </Wrapper>
  );
};

interface IEncyclopediaContent {
  activeItem: IEncyclopediaItemConfig | undefined;
  activeIndex: number;
}

interface IArrow {
  background: string;
  disableBackground: string;
}

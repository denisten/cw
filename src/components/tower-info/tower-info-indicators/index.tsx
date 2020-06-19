import { ProgressBar } from '../../../UI/progress-bar';
import { RowWrapper } from '../../../UI/row-wrapper';
import { MoneyWrapper } from '../../../UI/money-wrapper';
import React from 'react';
import styled from 'styled-components';
import { MTSSans } from '../../../fonts';

const HeaderLine = styled.div<IHeaderLine>`
  width: 100%;
  display: flex;
  margin-top: ${props => (props.sizeContent ? '0' : '32px')};
  height: ${props => (props.sizeContent ? '0px' : '55px')};
  overflow: ${props => (props.sizeContent ? 'hidden' : 'inherit')};
  transition: 0.2s;
`;

const HeaderLineElement = styled.div<IHeaderLineElement>`
  width: ${props => props.width}%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  margin-left: ${props => props.marginLeft};
  padding-bottom: ${props => props.paddingBottom};
  span {
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    color: #6e7782;
    font-family: ${MTSSans.REGULAR};
    + div {
      margin-top: 4px;
    }
    @media (max-resolution: 0.8dppx) {
      font-size: 1.5vh;
    }
  }
`;

const styledConfig = {
  firstHeaderLine: {
    paddingBottom: '4px',
  },
  secondHeaderLine: {
    marginLeft: '10%',
  },
  money: {
    fontSize: '20px',
    margin: '0px 13px 0 0px',
    color: '#001424',
  },
};
export const TowerInfoIndicators: React.FC<ITowerInfoIndicators> = ({
  hideTowerInfo,
  level,
  income,
}) => {
  return (
    <HeaderLine sizeContent={hideTowerInfo}>
      <HeaderLineElement {...styledConfig.firstHeaderLine}>
        <span>Уровень эволюции</span>
        <ProgressBar level={level} />
      </HeaderLineElement>

      <HeaderLineElement {...styledConfig.secondHeaderLine}>
        <span>Ежедневный доход</span>
        <RowWrapper>
          <MoneyWrapper count={income} {...styledConfig.money} />
        </RowWrapper>
      </HeaderLineElement>
    </HeaderLine>
  );
};

interface ITowerInfoIndicators {
  hideTowerInfo: boolean;
  level: number;
  income: number;
}

interface IHeaderLine {
  sizeContent: boolean;
}

interface IHeaderLineElement {
  width?: number;
  marginLeft?: string;
  paddingBottom?: string;
}

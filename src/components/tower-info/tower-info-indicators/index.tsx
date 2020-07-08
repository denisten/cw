import { ProgressBar } from '../../../UI/progress-bar';
import React from 'react';
import styled from 'styled-components';
import { MTSSans } from '../../../fonts';
import {
  TowersProgressStore,
  TowersTypes,
} from '../../../effector/towers-progress/store';
import { TutorialConditions } from '../../../effector/tutorial-store/store';
import playButtonImg from './play-button.svg';
import { BuildingsService } from '../../../buildings/config';
import { windowOpen } from '../../../utils/window-open';
import coinIncomeImg from './coin-income.svg';
import { useStore } from 'effector-react';

const EVOLUTION = 'evolution';

const HeaderLine = styled.div<IHeaderLine>`
  width: 100%;
  display: flex;
  margin-top: ${props => (props.sizeContent ? '0' : '17px')};
  height: ${props => (props.sizeContent ? '0px' : '84px')};
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
    .${EVOLUTION} {
      font-family: ${MTSSans.BOLD};
      font-style: normal;
      font-weight: 900;
      font-size: 24px;
      line-height: 24px;
      color: #04b5d2;
    }
    + div {
      margin-top: 4px;
    }
    @media (max-resolution: 0.8dppx) {
      font-size: 1.5vh;
    }
  }
`;

const IncomeWrapper = styled.div`
  display: flex;
  position: relative;
  top: 6px;
  font-family: ${MTSSans.REGULAR};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: #6e7782;
  span {
    font-size: 16px;
    color: #001424;
  }
`;

const PlayButton = styled.div`
  padding-left: 12px;
  box-sizing: border-box;
  position: relative;
  top: 8px;
  width: 132px;
  height: 43px;
  cursor: pointer;
  box-shadow: none;
  border: none;
  background: #04b5d2;
  border-radius: 10px;
  display: flex;
  align-items: center;
  transition-duration: 0.3s;
  transition-property: transform;

  :hover {
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 4px 15px #04b5d2;
  }
  span {
    font-family: ${MTSSans.BOLD};
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    color: #ffffff;
    margin-left: 10px;
  }
`;

const styledConfig = {
  firstHeaderLine: {
    paddingBottom: '4px',
  },
  secondHeaderLine: {
    marginLeft: '151px',
  },
  money: {
    marginRight: '6px',
  },
};

export const TowerInfoIndicators: React.FC<ITowerInfoIndicators> = ({
  hideTowerInfo,
  level,
  income,
  progress,
  towerTitle,
  tutorialCondition,
}) => {
  const { playButtonLink } = BuildingsService.getConfigForTower(towerTitle);
  const { needUpgrade } = useStore(TowersProgressStore)[towerTitle];

  const handlePlayButtonClick = () =>
    playButtonLink && windowOpen(playButtonLink);

  return (
    <HeaderLine sizeContent={hideTowerInfo}>
      <HeaderLineElement {...styledConfig.firstHeaderLine}>
        <span>
          <span className={EVOLUTION}>{level}</span> Уровень эволюции
        </span>
        <ProgressBar
          needUpgrade={needUpgrade}
          progress={progress}
          towerTitle={towerTitle}
          tutorialCondition={tutorialCondition}
        />
        <IncomeWrapper>
          <img
            src={coinIncomeImg}
            alt="coin-income"
            style={styledConfig.money}
          />
          <div>
            +<span>{income}</span> в день
          </div>
        </IncomeWrapper>
      </HeaderLineElement>
      <HeaderLineElement {...styledConfig.secondHeaderLine}>
        {playButtonLink && (
          <PlayButton onClick={handlePlayButtonClick}>
            <img src={playButtonImg} alt="play-button" />
            <span>Играть</span>
          </PlayButton>
        )}
      </HeaderLineElement>
    </HeaderLine>
  );
};

interface ITowerInfoIndicators {
  hideTowerInfo: boolean;
  level: number;
  income: number;
  progress: number;
  towerTitle: TowersTypes;
  tutorialCondition: TutorialConditions;
}

interface IHeaderLine {
  sizeContent: boolean;
}

interface IHeaderLineElement {
  width?: number;
  marginLeft?: string;
  paddingBottom?: string;
}

import { ProgressBar } from '../../../UI/progress-bar';
import React, { useState } from 'react';
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
import { Tooltip } from '../../../UI/tooltip';
import { RowWrapper } from '../../../UI/row-wrapper';
import { StyledSpan } from '../../../UI/span';
import playButtonSound from '../../../sound/play-button.mp3';
import { SettingsStore } from '../../../effector/settings/store';
import { useAudio } from '../../../hooks/use-sound';
import { reactGAEvent } from '../../../utils/ga-event';
import { transliterate } from '../../../utils/transliterate';

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
`;

const IncomeWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  top: 6px;

  font-size: 14px;
  line-height: 24px;
  color: #6e7782;

  span {
    margin-right: 6px;
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

const BoldSpan = styled.span`
  font-size: 16px;
  line-height: 1;
  font-family: ${MTSSans.BOLD};
  color: #001424;
  margin-right: 4px;
`;

const SpanElem = styled(StyledSpan)`
  font-size: 16px;
  line-height: 1.5;
  color: #6e7782;
  font-family: ${MTSSans.REGULAR};
  margin-right: 6px;
  display: flex;
  align-items: center;
  .${EVOLUTION} {
    font-family: ${MTSSans.BOLD};
    font-style: normal;
    font-weight: 900;
    font-size: 24px;
    line-height: 24px;
    color: #04b5d2;
  }

  @media (max-resolution: 0.8dppx) {
    font-size: 1.5vh;
  }
`;

const styledConfig = {
  rowWrapper: {
    alignItems: 'center',
  },
  firstHeaderLine: {
    paddingBottom: '4px',
  },
  secondHeaderLine: {
    marginLeft: '151px',
  },
  money: {
    marginRight: '6px',
  },
  tooltip1: {
    top: '-60px',
    right: '-280px',
    zIndex: 2,
  },

  tooltip2: {
    top: '-84px',
    zIndex: 2,
  },
};

const tooltipText1 = `Это уровень прогресса здания. Чем он выше, тем больший доход можно собирать ежедневно. Выполняй задания и развивай город!`;
const tooltipText2 = `Это ежедневно получаемый со здания доход`;

export enum ActiveTooltip {
  OFF = 'off',
  ONE = 'one',
  TWO = 'two',
}

export const TowerInfoIndicators: React.FC<ITowerInfoIndicators> = ({
  hideTowerInfo,
  level,
  income,
  progress,
  towerTitle,
  tutorialCondition,
  maxProgressValue,
  points,
}) => {
  const { playButtonLink } = BuildingsService.getConfigForTower(towerTitle);
  const { needUpgrade } = useStore(TowersProgressStore)[towerTitle];

  const [activeTooltip, setActiveTooltip] = useState(ActiveTooltip.OFF);
  const { title } = BuildingsService.getConfigForTower(towerTitle);
  const {
    sound: { volume },
  } = useStore(SettingsStore);

  const { play: playButtonPlay } = useAudio(playButtonSound, false);

  const handlePlayButtonClick = () => {
    reactGAEvent({
      eventLabel: 'igrat',
      eventCategory: 'zdanie',
      eventContent: transliterate(title),
    });
    playButtonLink && windowOpen(playButtonLink);
    volume && playButtonPlay();
  };

  return (
    <HeaderLine sizeContent={hideTowerInfo}>
      <HeaderLineElement {...styledConfig.firstHeaderLine}>
        <RowWrapper {...styledConfig.rowWrapper}>
          <SpanElem>
            <SpanElem className={EVOLUTION}>{level}</SpanElem> Уровень здания
          </SpanElem>
          <Tooltip
            tooltipId={ActiveTooltip.ONE}
            active={activeTooltip}
            text={tooltipText1}
            style={styledConfig.tooltip1}
            callBack={setActiveTooltip}
          />
        </RowWrapper>
        <ProgressBar
          points={points}
          maxProgressValue={maxProgressValue}
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
          <BoldSpan>+ {income}</BoldSpan> <span>в день</span>
          <Tooltip
            tooltipId={ActiveTooltip.TWO}
            active={activeTooltip}
            text={tooltipText2}
            style={styledConfig.tooltip2}
            callBack={setActiveTooltip}
          />
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

export interface ITowerInfoIndicators {
  maxProgressValue: number | null;
  hideTowerInfo: boolean;
  level: number;
  income: number;
  progress: number;
  towerTitle: TowersTypes;
  tutorialCondition: TutorialConditions;
  points: number;
}

interface IHeaderLine {
  sizeContent: boolean;
}

interface IHeaderLineElement {
  width?: number;
  marginLeft?: string;
  paddingBottom?: string;
}

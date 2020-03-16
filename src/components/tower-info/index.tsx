import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { ExitButton } from '../../UI/exit-button';
import {
  extraTowerInfoModalClosed,
  showUpgradeIcon,
} from '../../effector/app-condition/events';
import { addProgressPoints } from '../../effector/towers-progress/events';
import { useStore } from 'effector-react';
import {
  AppCondition,
  maxProgressValue,
} from '../../effector/app-condition/store';
import { ProgressBar } from '../../UI/progress-bar';
import { TowerInfoContent } from '../tower-info-content';
import {
  TowersProgressStore,
  TowersTypes,
} from '../../effector/towers-progress/store';
import { BuildingsService } from '../../buildings/config';
import { Directions } from '../../UI/tutorial-arrow';
import { BuildingsDescriptionService } from '../../buildings/descriptions';
import { CustomButton } from '../../UI/button';
import { ZIndexes } from '../root-component/z-indexes-enum';
import wrapperBackground from './background.svg';
import headerBackground from './header.svg';
import { RowWrapper } from '../../UI/row-wrapper/index';
import { MoneyWrapper } from '../../UI/money-wrapper';
import { pulseAnimationHOF } from '../../hoc/pulse-anim';
import {
  TutorialConditions,
  TutorialStore,
} from '../../effector/tutorial-store/store';
import {
  nextTutorDescriptionStep,
  nextTutorStep,
} from '../../effector/tutorial-store/events';
import { UserDataStore } from '../../effector/user-data/store';
import { useMoveTo } from '../../hooks/useMoveTo';
import { MoveDivider } from '../../UI/move-divider';

export type ModalWindowProps = {
  opened?: boolean;
};

enum marginRightValues {
  OPENED = 0,
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  CLOSED = -100,
}

export enum TowerInfoContentValues {
  TASK = 'task',
  CHAT = 'chat',
  DESCRIPTION = 'description',
}

enum TowerTutorialSteps {
  DESCRIPTION_DONT_OPENED = 0,
  DESCRIPTION_OPENED = 1,
  CHAT_OPENED = 2,
  TASKS_OPENED = 3,
}

const MAXLEVEL = 100;

export const ModalWindowWrapper = styled.div<ModalWindowProps>`
  position: absolute;
  z-index: ${ZIndexes.MODAL};
  right: -3px;
  width: 36%;
  height: 90%;
  top: 5%;
  box-sizing: border-box;
  margin-right: ${props =>
    !props.opened ? marginRightValues.CLOSED : marginRightValues.OPENED}%;
  transition-duration: 0.5s;
  transition-property: margin-right;
  display: flex;
  flex-direction: column;

  @media (max-resolution: 0.8dppx) {
    width: 36%;
    height: 80%;
  }

  @media screen and (max-width: 1440px) {
    height: 100%;
    top: 0%;
  }

  @media screen and (max-width: 1280px) {
    height: 100%;
    top: 0%;
    width: 45%;
  }
`;

const ModalWindowContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 40px;
  box-sizing: border-box;

  background-image: url(${wrapperBackground});
  background-size: 100% 100%;
  background-repeat: no-repeat;

  @media (max-resolution: 0.8dppx) {
    padding: 3vh;
  }
`;

const ModalWindowHeader = styled.div`
  width: 100%;
  height: 55px;
  background: url(${headerBackground}) no-repeat center;
  background-size: 100% 100%;
  flex-shrink: 0;
  position: relative;

  @media (max-resolution: 0.8dppx) {
    height: 5vh;
  }
`;
const TowerInfoHeader = styled.div`
  width: 100%;
  margin-bottom: 40px;

  @media (max-resolution: 0.8dppx) {
    margin-bottom: 2vh;
  }
`;

const HeaderLine = styled.div`
  width: 100%;
  display: flex;
  margin-top: 24px;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: -0.5px;
  color: #001424;
  font-family: 'MTSSansUltraWide';

  @media (max-resolution: 0.8dppx) {
    font-size: 2.5vh;
  }
`;

const MainText = styled.span`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #001424;

  + div {
    margin-top: 4px;
  }

  @media (max-resolution: 0.8dppx) {
    font-size: 1.5vh;
  }
`;

const UpgradeButton = styled.div<{ canUpgrade?: boolean; pulseAnim?: boolean }>`
  width: auto;
  height: 40px;
  padding: 0 20px;
  box-sizing: border-box;
  border-radius: 2px;
  background-color: ${props => (props.canUpgrade ? '#02adc9' : '#e2e5eb')};
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: ${props => (props.canUpgrade ? 'pointer' : 'default')};
  font-size: 16px;
  pointer-events: ${props => (props.canUpgrade ? 'auto' : 'none')};
  font-family: 'MTSSansBold', 'regular';
  animation-name: ${props =>
    props.pulseAnim ? pulseAnimationHOF('159, 169, 176') : 'none'};
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 0.6s;

  @media (max-resolution: 0.8dppx) {
    font-size: 1.5vh;
    height: 3vh;
    padding: 0 1.4vh;
  }
`;

const HeaderLineElement = styled.div<{
  width?: number;
  marginLeft?: string;
  paddingBottom?: string;
}>`
  width: ${props => props.width}%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  margin-left: ${props => props.marginLeft};
  padding-bottom: ${props => props.paddingBottom};
`;

const TowerInfoMenu = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  /* border-bottom: 1px solid #e2e5eb; */
  margin-bottom: 28px;
`;

const LineGrown = keyframes`
from {
    width: 0%;
}

to {
  width: 100%;
}
`;

const TowerInfoMenuElement = styled.div<{ selected: boolean }>`
  height: 100%;
  text-align: center;
  cursor: pointer;
  z-index: 2;
  margin-right: 10%;
  color: #${props => (props.selected ? '001424' : '6e7782')};
  font-size: 20px;
  font-family: ${props =>
    props.selected ? 'MTSSansMedium' : 'MTSSansRegular'};
  position: relative;
  padding-bottom: 8px;

  :after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0%;
    /* background-color: #08b0cc; */
    height: 3px;
    animation-name: ${props => (props.selected ? LineGrown : null)};
    animation-fill-mode: both;
    animation-timing-function: linear;
    animation-duration: 0.5s;
    transition: 0.5s;
  }

  @media (max-resolution: 0.8dppx) {
    font-size: 1.5vh;
  }
`;

const StyleConfig = {
  exitButton: {
    height: '50%',
    top: 25,
    left: 90,
    hoverFlag: true,
  },
  tutorialArrow: {
    direction: Directions.TOP,
    range: 2,
    top: 48,
    left: 40,
  },
  descriptionButton: {
    position: 'absolute',
    top: '46%',
    left: '39.7%',
  },
  enterButton: {
    width: '160px',
    height: '40px',
    content: 'Что дальше?',
    fontSize: '16px',
    margin: '30px 0',
    color: '#02adc9',
    position: 'absolute',
    bottom: 10,
  },
  rowWrapper: {
    width: '100%',
    justifyContent: 'space-between',
  },
  money: {
    fontSize: '20px',
    margin: '0px 13px 0 0px',
    color: 'black',
    fontWeight: 'bold',
  },
  firstHeaderLine: {
    paddingBottom: '4px',
  },
  secondHeaderLine: {
    marginLeft: '10%',
  },
};

export const TowerInfo: React.FC<ModalWindowProps> = ({ opened }) => {
  const {
      focusOn: { towerTitle: notVerifiedTowerTitle },
    } = useStore(AppCondition),
    LocalTowerProgressStore = useStore(TowersProgressStore);
  const { tutorialCondition } = useStore(TutorialStore);
  const towerTitle: TowersTypes =
    notVerifiedTowerTitle || TowersTypes.MAIN_TOWER;
  const localBuildingService = new BuildingsService(),
    localDescriptionService = new BuildingsDescriptionService();
  const descriptionText: Array<string> = localDescriptionService.getAllDescriptionForCurrentTower(
    towerTitle
  );

  const { title, maxLevel } = localBuildingService.getConfigForTower(
    towerTitle
  );
  const { level } = useStore(TowersProgressStore)[towerTitle];

  const [selectedMenu, setSelectMenu] = useState(
    TowerInfoContentValues.DESCRIPTION
  );
  const [towerTutorialStep, setTowerTutorialStep] = useState(0);
  useEffect(() => {
    if (
      LocalTowerProgressStore[towerTitle].progress >= maxProgressValue &&
      tutorialCondition
    ) {
      nextTutorStep();
    }
  }, [LocalTowerProgressStore[towerTitle].progress]);

  const handleClick = () => {
    if (towerTitle) {
      showUpgradeIcon(towerTitle);
      extraTowerInfoModalClosed();
    }
  };

  const grownLineAndNextStep = () => {
    nextTutorDescriptionStep();
    addProgressPoints({ points: 33.34, towerTitle: towerTitle });
  };

  const showDescription = () => {
    setSelectMenu(TowerInfoContentValues.DESCRIPTION);
    setTowerTutorialStep(TowerTutorialSteps.DESCRIPTION_OPENED);
    grownLineAndNextStep();
  };

  const showChat = () => {
    setSelectMenu(TowerInfoContentValues.CHAT);
    setTowerTutorialStep(TowerTutorialSteps.CHAT_OPENED);
    grownLineAndNextStep();
  };

  const showTasks = () => {
    setSelectMenu(TowerInfoContentValues.TASK);
    setTowerTutorialStep(TowerTutorialSteps.TASKS_OPENED);
    grownLineAndNextStep();
  };
  const nextTowerTutorialStep = () => {
    if (!tutorialCondition) {
      addProgressPoints({ points: 33.34, towerTitle: towerTitle });
    } else if (
      towerTutorialStep === TowerTutorialSteps.DESCRIPTION_DONT_OPENED
    ) {
      showDescription();
    } else if (towerTutorialStep === TowerTutorialSteps.DESCRIPTION_OPENED) {
      showChat();
    } else if (towerTutorialStep === TowerTutorialSteps.CHAT_OPENED) {
      showTasks();
    }
  };

  const { money } = useStore(UserDataStore);
  const { left, width, handleMouseClick } = useMoveTo();
  return (
    <ModalWindowWrapper opened={opened}>
      <ModalWindowHeader>
        <ExitButton
          {...StyleConfig.exitButton}
          callBack={() => extraTowerInfoModalClosed()}
        />
      </ModalWindowHeader>
      <ModalWindowContentWrapper>
        <TowerInfoHeader>
          <RowWrapper {...StyleConfig.rowWrapper}>
            <Title>{title}</Title>
            <UpgradeButton
              canUpgrade={
                LocalTowerProgressStore[towerTitle].progress >= MAXLEVEL &&
                level < maxLevel
              }
              onClick={handleClick}
              pulseAnim={
                tutorialCondition ===
                TutorialConditions.UPGRADE_BUTTON_TOWER_INFO
              }
            >
              Улучшить
            </UpgradeButton>
          </RowWrapper>

          <HeaderLine>
            <HeaderLineElement {...StyleConfig.firstHeaderLine}>
              <MainText>Уровень эволюции</MainText>

              <ProgressBar
                progress={LocalTowerProgressStore[towerTitle].progress}
              />
            </HeaderLineElement>

            <HeaderLineElement {...StyleConfig.secondHeaderLine}>
              <MainText>Еженедельный доход</MainText>

              <RowWrapper>
                <MoneyWrapper count={money} {...StyleConfig.money} />
              </RowWrapper>
            </HeaderLineElement>
          </HeaderLine>
        </TowerInfoHeader>
        <TowerInfoMenu>
          <RowWrapper>
            <TowerInfoMenuElement
              selected={selectedMenu === TowerInfoContentValues.DESCRIPTION}
              onClick={e => {
                setSelectMenu(TowerInfoContentValues.DESCRIPTION);
                handleMouseClick(e);
              }}
            >
              Описание
            </TowerInfoMenuElement>
            <TowerInfoMenuElement
              selected={selectedMenu === TowerInfoContentValues.CHAT}
              onClick={e => {
                setSelectMenu(TowerInfoContentValues.CHAT);
                handleMouseClick(e);
              }}
            >
              Чат
            </TowerInfoMenuElement>
            <TowerInfoMenuElement
              selected={selectedMenu === TowerInfoContentValues.TASK}
              onClick={e => {
                setSelectMenu(TowerInfoContentValues.TASK);
                handleMouseClick(e);
              }}
            >
              Задания
            </TowerInfoMenuElement>
            <MoveDivider width={width} left={left} />
          </RowWrapper>
        </TowerInfoMenu>

        <TowerInfoContent
          selectedMenu={selectedMenu}
          text={
            tutorialCondition &&
            towerTutorialStep === TowerTutorialSteps.DESCRIPTION_DONT_OPENED
              ? [descriptionText[0]]
              : descriptionText
          }
        />

        {!tutorialCondition ||
        tutorialCondition === TutorialConditions.NEXT_BUTTON_TOWER_INFO ? (
          <CustomButton
            animFlag={
              tutorialCondition === TutorialConditions.NEXT_BUTTON_TOWER_INFO
            }
            callback={() => nextTowerTutorialStep()}
            {...StyleConfig.enterButton}
          />
        ) : null}
      </ModalWindowContentWrapper>
    </ModalWindowWrapper>
  );
};

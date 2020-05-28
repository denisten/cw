import React, { useState, useMemo, createRef } from 'react';
import styled from 'styled-components';
import { ExitButton } from '../../UI/exit-button';
import {
  extraTowerInfoModalClosed,
  showUpgradeIcon,
  setTowerInfoContent,
} from '../../effector/app-condition/events';
import {
  addProgressPoints,
  upgradeTower,
} from '../../effector/towers-progress/events';
import { useStore } from 'effector-react';
import {
  AppCondition,
  TowerInfoContentValues,
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
import { ButtonClassNames, Button } from '../../UI/button';
import { ZIndexes } from '../root-component/z-indexes-enum';
import wrapperBackground from './background.svg';
import headerBackground from './header.png';
import { RowWrapper } from '../../UI/row-wrapper';
import { MoneyWrapper } from '../../UI/money-wrapper';
import {
  TutorialConditions,
  TutorialStore,
} from '../../effector/tutorial-store/store';
import {
  nextTutorDescriptionStep,
  nextTutorStep,
  pauseTutorialMode,
} from '../../effector/tutorial-store/events';
import { UserDataStore } from '../../effector/user-data/store';
import { useMoveTo } from '../../hooks/useMoveTo';
import { MoveDivider } from '../../UI/move-divider';
import { device } from '../../UI/media';
import { TowerInfoUpgradeButton } from '../../UI/tower-info-upgrade-button';
import { MTSSans } from '../../fonts';
import { towerUpdateHandler } from '../../utils/tower-update-handler';

export type ModalWindowProps = {
  opened?: boolean;
};

enum marginRightValues {
  OPENED = 0,
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  CLOSED = -100,
}

enum TowerTutorialSteps {
  DESCRIPTION_DONT_OPENED = 0,
  DESCRIPTION_OPENED = 1,
  CHAT_OPENED = 2,
  TASKS_OPENED = 3,
}

const MAX_POINTS = 100;
const FIRST_ELEM_WIDTH = 92;
const COMMON_TRANSITION = 0.5;

export const ModalWindowWrapper = styled.div<ModalWindowProps>`
  position: absolute;
  z-index: ${ZIndexes.MODAL};
  right: -3px;
  width: 36%;
  height: 100%;
  top: 0;
  box-sizing: border-box;
  margin-right: ${props =>
    !props.opened ? marginRightValues.CLOSED : marginRightValues.OPENED}%;
  transition-duration: ${COMMON_TRANSITION}s;
  transition-property: margin-right;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1440px) {
    width: 547px;
  }

  @media screen and (max-width: 1280px) {
    height: 100%;
    top: 0%;
  }
`;

const ModalWindowContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 32px 40px 40px;
  box-sizing: border-box;
  background-image: url(${wrapperBackground});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
`;

const ModalWindowHeader = styled.div`
  width: 100%;
  height: 55px;
  background: url(${headerBackground}) no-repeat center white;
  background-size: 100% 100%;
  flex-shrink: 0;
  position: relative;

  @media (max-resolution: 0.8dppx) {
    height: 5vh;
  }
`;
const TowerInfoHeader = styled.div<{ sizeContent: boolean }>`
  width: 100%;
  margin-bottom: ${props => (props.sizeContent ? '24px' : '32px')};
  flex-shrink: 0;
  transition: ${COMMON_TRANSITION}s;

  @media ${device.laptopS} {
    margin-bottom: 30px;
  }
`;

const HeaderLine = styled.div<{ sizeContent: boolean }>`
  width: 100%;
  display: flex;
  margin-top: ${props => (props.sizeContent ? '0' : '32px')};
  height: ${props => (props.sizeContent ? '0px' : '55px')};
  overflow: ${props => (props.sizeContent ? 'hidden' : 'inherit')};
  transition: 0.2s;
`;

const Title = styled.div<{ sizeContent: boolean }>`
  font-size: ${props => (props.sizeContent ? '29px' : '32px')};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: -0.5px;
  color: #001424;
  font-family: ${MTSSans.ULTRA_WIDE};
  transition: ${COMMON_TRANSITION}s;
`;

const MainText = styled.span`
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
  flex-shrink: 0;
`;

const TowerInfoMenuElement = styled.div<{
  selected: boolean;
}>`
  height: 100%;
  text-align: center;
  cursor: pointer;
  z-index: 2;
  margin-right: 40px;
  color: #${props => (props.selected ? '001424' : '6e7782')};
  font-size: 20px;
  font-family: ${props =>
    props.selected ? 'MTSSansMedium' : 'MTSSansRegular'};
  position: relative;
  padding-bottom: 12px;
  transition: all 0.8s ease;

  &:hover {
    color: black;
  }

  @media (max-resolution: 0.8dppx) {
    font-size: 1.5vh;
  }
`;

const StyleConfig = {
  exitButton: {
    top: '25%',
    left: '90%',
  },
  tutorialArrow: {
    direction: Directions.TOP,
    range: 2,
    top: '48%',
    left: '40%',
  },
  descriptionButton: {
    position: 'absolute',
    top: '46%',
    left: '39.7%',
  },
  enterButton: {
    width: 160,
    height: 40,
    content: 'Что дальше?',
  },
  rowWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  money: {
    fontSize: '20px',
    margin: '0px 13px 0 0px',
    color: '#001424',
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
    focusOn: notVerifiedTowerTitle,
    hideTowerInfo,
    selectTowerInfoContent,
  } = useStore(AppCondition);
  const LocalTowerProgressStore = useStore(TowersProgressStore);
  const { tutorialCondition } = useStore(TutorialStore);
  const towerTitle: TowersTypes =
    notVerifiedTowerTitle || TowersTypes.MAIN_TOWER;
  const localDescriptionService = new BuildingsDescriptionService();
  const descriptionText: Array<string> = localDescriptionService.getAllDescriptionForCurrentTower(
    towerTitle
  );

  const { title, maxLevel, tutorialTower } = BuildingsService.getConfigForTower(
    towerTitle
  );
  const {
    level: { level },
  } = useStore(TowersProgressStore)[towerTitle];

  const [towerTutorialStep, setTowerTutorialStep] = useState(0);

  const handleClick = () => {
    if (towerTitle) {
      showUpgradeIcon(towerTitle);
      towerUpdateHandler(tutorialCondition, towerTitle);
    }
  };
  const refsCollection: Array<React.RefObject<HTMLDivElement>> = useMemo(
    () => Array.from({ length: 3 }).map(() => createRef()),
    []
  );
  const {
    left,
    width,
    hLeft,
    hWidth,
    hovered,
    handleMouseOver,
    handleMouseOut,
  } = useMoveTo(FIRST_ELEM_WIDTH, refsCollection, selectTowerInfoContent);

  const grownLineAndNextStep = () => {
    nextTutorDescriptionStep();
    addProgressPoints({ points: 33.34, towerTitle: towerTitle });
  };

  const showDescription = () => {
    setTowerInfoContent(TowerInfoContentValues.DESCRIPTION);
    setTowerTutorialStep(TowerTutorialSteps.DESCRIPTION_OPENED);
    grownLineAndNextStep();
  };

  const showChat = () => {
    setTowerInfoContent(TowerInfoContentValues.CHAT);
    setTowerTutorialStep(TowerTutorialSteps.CHAT_OPENED);
    grownLineAndNextStep();
  };

  const showTasks = () => {
    setTowerInfoContent(TowerInfoContentValues.TASK);
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
      nextTutorStep();
    }
  };
  const { money } = useStore(UserDataStore);

  return (
    <ModalWindowWrapper opened={opened}>
      <ModalWindowHeader>
        <ExitButton
          {...StyleConfig.exitButton}
          callBack={() => {
            if (tutorialCondition) {
              pauseTutorialMode();
            }
            extraTowerInfoModalClosed();
          }}
        />
      </ModalWindowHeader>
      <ModalWindowContentWrapper>
        <TowerInfoHeader sizeContent={hideTowerInfo}>
          <RowWrapper {...StyleConfig.rowWrapper}>
            <Title sizeContent={hideTowerInfo}>{title}</Title>
            <TowerInfoUpgradeButton
              handleClick={handleClick}
              pulseAnim={
                tutorialCondition ===
                TutorialConditions.UPGRADE_BUTTON_TOWER_INFO
              }
              canUpgrade={
                LocalTowerProgressStore[towerTitle].points >= MAX_POINTS &&
                level < maxLevel
              }
              hide={hideTowerInfo}
            />
            <TowerInfoUpgradeButton
              handleClick={() => upgradeTower(towerTitle)}
              canUpgrade={level < maxLevel ? true : false}
            />
          </RowWrapper>

          <HeaderLine sizeContent={hideTowerInfo}>
            <HeaderLineElement {...StyleConfig.firstHeaderLine}>
              <MainText>Уровень эволюции</MainText>

              <ProgressBar
                progress={LocalTowerProgressStore[towerTitle].points}
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
          <RowWrapper onMouseOut={() => handleMouseOut()}>
            <TowerInfoMenuElement
              selected={
                selectTowerInfoContent === TowerInfoContentValues.DESCRIPTION
              }
              onClick={() => {
                setTowerInfoContent(TowerInfoContentValues.DESCRIPTION);
              }}
              onMouseOver={handleMouseOver}
              ref={refsCollection[0]}
            >
              Описание
            </TowerInfoMenuElement>
            <TowerInfoMenuElement
              selected={selectTowerInfoContent === TowerInfoContentValues.CHAT}
              onClick={() => {
                setTowerInfoContent(TowerInfoContentValues.CHAT);
              }}
              onMouseOver={handleMouseOver}
              ref={refsCollection[1]}
            >
              Чат
            </TowerInfoMenuElement>
            <TowerInfoMenuElement
              selected={selectTowerInfoContent === TowerInfoContentValues.TASK}
              onClick={() => {
                setTowerInfoContent(TowerInfoContentValues.TASK);
              }}
              onMouseOver={handleMouseOver}
              ref={refsCollection[2]}
            >
              Задания
            </TowerInfoMenuElement>
            <MoveDivider
              width={hovered ? hWidth : width}
              left={hovered ? hLeft : left}
            />
          </RowWrapper>
        </TowerInfoMenu>

        <TowerInfoContent
          selectedMenu={selectTowerInfoContent}
          text={
            tutorialCondition &&
            towerTutorialStep === TowerTutorialSteps.DESCRIPTION_DONT_OPENED
              ? [descriptionText[0]]
              : descriptionText
          }
          hideContent={hideTowerInfo}
          towerTitle={towerTitle}
        />

        {!tutorialCondition ||
        (tutorialCondition === TutorialConditions.NEXT_BUTTON_TOWER_INFO &&
          tutorialTower) ? (
          <Button
            className={ButtonClassNames.OUTLINE_NORMAL}
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

import React, { useState, useMemo, createRef, useRef, useEffect } from 'react';
import styled from 'styled-components';
import {
  setTowerInfoContent,
  setTowerInfoShift,
} from '../../effector/app-condition/events';
import { addProgressPoints } from '../../effector/towers-progress/events';
import { useStore } from 'effector-react';
import {
  AppCondition,
  TowerInfoContentValues,
} from '../../effector/app-condition/store';
import { TowerInfoContent } from '../tower-info-content';
import {
  TowersProgressStore,
  TowersTypes,
} from '../../effector/towers-progress/store';
import { BuildingsService } from '../../buildings/config';
import { BuildingsDescriptionService } from '../../buildings/descriptions';
import { ButtonClassNames, Button } from '../../UI/button';
import { ZIndexes } from '../root-component/z-indexes-enum';
import wrapperBackground from './background.svg';
import {
  TutorialConditions,
  TutorialStore,
} from '../../effector/tutorial-store/store';
import {
  nextTutorDescriptionStep,
  nextTutorStep,
} from '../../effector/tutorial-store/events';
import { device } from '../../UI/media';
import { TowerInfoHeader } from './tower-info-header';
import { TowerInfoTitle } from './tower-info-title';
import { TowerInfoIndicators } from './tower-info-indicators';
import { TowerInfoMenu } from './tower-info-menu';
import { TaskMessagesStore } from '../../effector/task-messages/store';

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

export const MAX_POINTS = 100;
export const COMMON_TRANSITION = 0.5;

export const TowerInfoWrapper = styled.div<ModalWindowProps>`
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
    top: 0;
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

const TowerInfoHeader1 = styled.div<{ sizeContent: boolean }>`
  width: 100%;
  margin-bottom: ${props => (props.sizeContent ? '24px' : '32px')};
  flex-shrink: 0;
  transition: ${COMMON_TRANSITION}s;

  @media ${device.laptopS} {
    margin-bottom: 30px;
  }
`;

const StyleConfig = {
  enterButton: {
    width: 160,
    height: 40,
    content: 'Что дальше?',
  },
};

const grownLineAndNextStep = (towerTitle: TowersTypes) => {
  nextTutorDescriptionStep();
  addProgressPoints({ points: 33.34, towerTitle });
};

export const TowerInfo: React.FC<ModalWindowProps> = ({ opened }) => {
  const localDescriptionService = new BuildingsDescriptionService();
  const {
    focusOn: notVerifiedTowerTitle,
    hideTowerInfo,
    selectTowerInfoContent,
  } = useStore(AppCondition);
  const towerInfoRef = useRef<HTMLDivElement>(null);
  const { tutorialCondition } = useStore(TutorialStore);
  const towerTitle = notVerifiedTowerTitle || TowersTypes.MAIN_TOWER;
  const descriptionText: string[] = localDescriptionService.getAllDescriptionForCurrentTower(
    towerTitle
  );
  const {
    level: { level },
    productIncome,
  } = useStore(TowersProgressStore)[towerTitle];
  const productIncomeValue = productIncome ? productIncome.value : 0;
  const { ended } = useStore(TaskMessagesStore)[towerTitle];
  const { tutorialTower } = BuildingsService.getConfigForTower(towerTitle);

  const refsCollection: Array<React.RefObject<HTMLDivElement>> = useMemo(
    () => Array.from({ length: 3 }).map(() => createRef()),
    []
  );

  const [towerTutorialStep, setTowerTutorialStep] = useState(0);

  const showDescription = () => {
    setTowerInfoContent(TowerInfoContentValues.DESCRIPTION);
    setTowerTutorialStep(TowerTutorialSteps.DESCRIPTION_OPENED);
    grownLineAndNextStep(towerTitle);
  };

  const showChat = () => {
    setTowerInfoContent(TowerInfoContentValues.CHAT);
    setTowerTutorialStep(TowerTutorialSteps.CHAT_OPENED);
    grownLineAndNextStep(towerTitle);
  };

  const showTasks = () => {
    setTowerInfoContent(TowerInfoContentValues.TASK);
    setTowerTutorialStep(TowerTutorialSteps.TASKS_OPENED);
    grownLineAndNextStep(towerTitle);
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

  const showButton =
    !tutorialCondition ||
    (tutorialCondition === TutorialConditions.NEXT_BUTTON_TOWER_INFO &&
      tutorialTower);

  useEffect(() => {
    if (towerInfoRef && towerInfoRef.current) {
      setTowerInfoShift(towerInfoRef.current?.offsetWidth);
    }
  }, [towerInfoRef]);

  const towerInfoContentText =
    tutorialCondition &&
    towerTutorialStep === TowerTutorialSteps.DESCRIPTION_DONT_OPENED
      ? [descriptionText[0]]
      : descriptionText;

  return (
    <TowerInfoWrapper opened={opened} ref={towerInfoRef}>
      <TowerInfoHeader tutorialCondition={tutorialCondition} />
      <ModalWindowContentWrapper>
        <TowerInfoHeader1 sizeContent={hideTowerInfo}>
          <TowerInfoTitle
            tutorialCondition={tutorialCondition}
            towerTitle={towerTitle}
          />
          <TowerInfoIndicators
            level={level}
            income={productIncomeValue}
            hideTowerInfo={hideTowerInfo}
          />
        </TowerInfoHeader1>
        <TowerInfoMenu
          isChatEnded={ended}
          refsCollection={refsCollection}
          selectTowerInfoContent={selectTowerInfoContent}
        />

        <TowerInfoContent
          selectedMenu={selectTowerInfoContent}
          text={towerInfoContentText}
          hideContent={hideTowerInfo}
          towerTitle={towerTitle}
        />

        {showButton && (
          <Button
            pulseAnimFlag={
              tutorialCondition === TutorialConditions.NEXT_BUTTON_TOWER_INFO
            }
            className={ButtonClassNames.OUTLINE_NORMAL}
            callback={nextTowerTutorialStep}
            {...StyleConfig.enterButton}
          />
        )}
      </ModalWindowContentWrapper>
    </TowerInfoWrapper>
  );
};

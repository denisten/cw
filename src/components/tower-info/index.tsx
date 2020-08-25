import React, { useState, useMemo, createRef, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { setTowerInfoContent } from '../../effector/app-condition/events';
import { addProgressPoints } from '../../effector/towers-progress/events';
import { useStore } from 'effector-react';
import {
  AppConditionStore,
  TowerInfoContentValues,
} from '../../effector/app-condition/store';
import {
  TowersProgressStore,
  TowersTypes,
} from '../../effector/towers-progress/store';
import { BuildingsDescriptionService } from '../../buildings/descriptions';
import { ButtonClassNames, Button } from '../../UI/button';
import { ZIndexes } from '../root-component/z-indexes-enum';

import {
  TutorialConditions,
  TutorialStore,
} from '../../effector/tutorial-store/store';
import {
  nextTutorDescriptionStep,
  nextTutorStep,
} from '../../effector/tutorial-store/events';
import { TowerInfoHeader } from './tower-info-header';
import { TowerInfoTitle } from './tower-info-title';
import { TowerInfoIndicators } from './tower-info-indicators';
import { TowerInfoMenu } from './tower-info-menu';
import { ChatStore } from '../../effector/chat/store';
import { TowerInfoModalStore } from '../../effector/tower-info-modal-store/store';
import { TowerInfoContent } from './tower-info-content';
import { setTowerInfoShift } from '../../effector/tower-info-modal-store/events';
import background from './background.svg';
import { DescriptionStore } from '../../effector/descriptions/store';
import { useFetchDescriptions } from '../../hooks/use-fetch-descriptions';
import { useAudio } from '../../hooks/use-sound';
import towerOpen from '../../sound/towerOpen.wav';
import { SettingsStore } from '../../effector/settings/store';
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
  background: url(${background}) no-repeat center;
  background-size: 100% 100%;
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
  display: flex;
  flex-direction: column;
`;

const TowerInfoHeader1 = styled.div<{ sizeContent: boolean }>`
  width: 100%;
  margin-bottom: ${props => (props.sizeContent ? '24px' : '21px')};
  flex-shrink: 0;
  transition: ${COMMON_TRANSITION}s;
`;

const StyleConfig = {
  enterButton: {
    width: 160,
    height: 40,
    content: 'Что дальше?',
    style: {
      position: 'absolute',
      bottom: '66px',
      left: '32px',
    } as React.CSSProperties,
  },
  unblockButton: {
    width: 234,
    height: 50,
    content: 'Разблокировать',
    style: {
      position: 'absolute',
      bottom: '140px',
      left: '140px',
    } as React.CSSProperties,
  },
};

const grownLineAndNextStep = (
  towerTitle: TowersTypes,
  tutorialCondition: TutorialConditions
) => {
  if (tutorialCondition) {
    nextTutorDescriptionStep();
    addProgressPoints({ points: 33.34, towerTitle });
  }
};

const TowerInfo: React.FC = () => {
  const localDescriptionService = new BuildingsDescriptionService();
  const {
    isExtraTowerInfoModalOpen,
    focusOn: notVerifiedTowerTitle,
    hideTowerInfo,
  } = useStore(TowerInfoModalStore);
  const {
    sound: { enable, volume },
  } = useStore(SettingsStore);

  const playWhenTowerIsOpen = enable && isExtraTowerInfoModalOpen;

  useAudio(towerOpen, playWhenTowerIsOpen, false, volume);

  const { selectTowerInfoContent } = useStore(AppConditionStore);
  const { tutorialCondition } = useStore(TutorialStore);
  const towerTitle = notVerifiedTowerTitle || TowersTypes.MAIN_TOWER;
  useFetchDescriptions();

  const {
    level: { level, income, levelUpPercentage },
    factors,
  } = useStore(TowersProgressStore)[towerTitle];

  const { ended } = useStore(ChatStore)[towerTitle];

  const refsCollection: Array<React.RefObject<HTMLDivElement>> = useMemo(
    () => Array.from({ length: 3 }).map(() => createRef()),
    []
  );

  const { description, title, subscriptionText } = useStore(DescriptionStore)[
    towerTitle
  ];
  const returnDescriptionObject = () => {
    if (!description || !title) {
      return {
        title: localDescriptionService.getAllDescriptionForCurrentTower(
          towerTitle
        )[0],
        description: localDescriptionService
          .getAllDescriptionForCurrentTower(towerTitle)
          .join(' '),
      };
    } else {
      return { description, title };
    }
  };

  const [towerTutorialStep, setTowerTutorialStep] = useState(0);
  const towerInfoRef = useRef<HTMLDivElement>(null);

  const openDescriptionTab = () => {
    setTowerInfoContent(TowerInfoContentValues.DESCRIPTION);
    setTowerTutorialStep(TowerTutorialSteps.DESCRIPTION_OPENED);
    grownLineAndNextStep(towerTitle, tutorialCondition);
  };

  const openChatTab = () => {
    setTowerInfoContent(TowerInfoContentValues.CHAT);
    setTowerTutorialStep(TowerTutorialSteps.CHAT_OPENED);
    grownLineAndNextStep(towerTitle, tutorialCondition);
  };

  const openTasksTab = () => {
    setTowerInfoContent(TowerInfoContentValues.TASK);
    setTowerTutorialStep(TowerTutorialSteps.TASKS_OPENED);
    grownLineAndNextStep(towerTitle, tutorialCondition);
  };

  const nextTowerTutorialStep = () => {
    if (!tutorialCondition) {
      addProgressPoints({ points: 33.34, towerTitle: towerTitle });
    } else if (
      towerTutorialStep === TowerTutorialSteps.DESCRIPTION_DONT_OPENED
    ) {
      openDescriptionTab();
    } else if (towerTutorialStep === TowerTutorialSteps.DESCRIPTION_OPENED) {
      openChatTab();
    } else if (towerTutorialStep === TowerTutorialSteps.CHAT_OPENED) {
      openTasksTab();
      nextTutorStep();
    }
  };

  const showButton =
    tutorialCondition === TutorialConditions.NEXT_BUTTON_TOWER_INFO &&
    towerTutorialStep !== TowerTutorialSteps.DESCRIPTION_DONT_OPENED;

  const showUnblockButton =
    tutorialCondition === TutorialConditions.NEXT_BUTTON_TOWER_INFO &&
    towerTutorialStep === TowerTutorialSteps.DESCRIPTION_DONT_OPENED;

  useEffect(() => {
    if (towerInfoRef.current) {
      setTowerInfoShift(towerInfoRef.current?.offsetWidth);
    }
  }, [towerInfoRef]);

  const hideDescription =
    tutorialCondition !== TutorialConditions.OFF &&
    towerTutorialStep === TowerTutorialSteps.DESCRIPTION_DONT_OPENED;
  return (
    <TowerInfoWrapper opened={isExtraTowerInfoModalOpen} ref={towerInfoRef}>
      <TowerInfoHeader tutorialCondition={tutorialCondition} />
      <ModalWindowContentWrapper>
        <TowerInfoHeader1 sizeContent={hideTowerInfo}>
          <TowerInfoTitle
            tutorialCondition={tutorialCondition}
            towerTitle={towerTitle}
            factors={factors}
            subscriptionText={subscriptionText}
          />
          <TowerInfoIndicators
            level={level}
            towerTitle={towerTitle}
            progress={levelUpPercentage}
            income={income}
            hideTowerInfo={hideTowerInfo}
            tutorialCondition={tutorialCondition}
          />
        </TowerInfoHeader1>
        <TowerInfoMenu
          isChatEnded={ended}
          refsCollection={refsCollection}
          selectTowerInfoContent={selectTowerInfoContent}
          towerTitle={towerTitle}
        />

        <TowerInfoContent
          switchers={{
            openChatTab,
            openDescriptionTab,
            openTasksTab,
          }}
          selectedMenu={selectTowerInfoContent}
          productDescription={returnDescriptionObject()}
          towerTitle={towerTitle}
          hideDescription={hideDescription}
        />

        {showButton && (
          <Button
            pulseAnimFlag={showButton}
            className={ButtonClassNames.OUTLINE_NORMAL}
            callback={nextTowerTutorialStep}
            {...StyleConfig.enterButton}
          />
        )}
        {showUnblockButton && (
          <Button
            pulseAnimFlag={showUnblockButton}
            className={ButtonClassNames.NORMAL}
            callback={nextTowerTutorialStep}
            {...StyleConfig.unblockButton}
          />
        )}
      </ModalWindowContentWrapper>
    </TowerInfoWrapper>
  );
};

export interface ITabSwitchers {
  openDescriptionTab: () => void;
  openChatTab: () => void;
  openTasksTab: () => void;
}

export default TowerInfo;

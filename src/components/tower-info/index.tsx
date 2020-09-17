import React, { useState, useMemo, createRef, useRef, useEffect } from 'react';
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
import {
  TutorialConditions,
  TutorialStore,
} from '../../effector/tutorial-store/store';
import {
  nextTutorDescriptionStep,
  nextTutorStep,
} from '../../effector/tutorial-store/events';
import { ChatStore } from '../../effector/chat/store';
import { TowerInfoModalStore } from '../../effector/tower-info-modal-store/store';
import { setTowerInfoShift } from '../../effector/tower-info-modal-store/events';
import { DescriptionStore } from '../../effector/descriptions/store';
import { useFetchDescriptions } from '../../hooks/use-fetch-descriptions';
import { reactGAEvent } from '../../utils/ga-event';
import { TasksStore } from '../../effector/tasks-store/store';
import { MissionsStore } from '../../effector/missions-store/store';
import { filterTasksArray } from '../../utils/filtered-missions-array';
import { useHideEmptyTaskMarker } from '../../hooks/use-hide-empty-task-marker';
import { ProductLevelStore } from '../../effector/product-level/store';
import { TowerInfoLayout } from './layout';
import { ButtonClassNames } from '../../UI/button';
import { SettingsStore } from '../../effector/settings/store';

enum TowerTutorialSteps {
  DESCRIPTION_DONT_OPENED = 0,
  DESCRIPTION_OPENED = 1,
  CHAT_OPENED = 2,
  TASKS_OPENED = 3,
}

export const MAX_POINTS = 100;
export const COMMON_TRANSITION = 0.5;

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

  const { selectTowerInfoContent } = useStore(AppConditionStore);
  const { tutorialCondition } = useStore(TutorialStore);
  const towerTitle = notVerifiedTowerTitle || TowersTypes.MAIN_TOWER;
  useFetchDescriptions();

  const {
    level: { level, income, levelUpPercentage },
    factors,
    points,
  } = useStore(TowersProgressStore)[towerTitle];
  const { maxProgressValue } = useStore(ProductLevelStore)[level];
  const { ended } = useStore(ChatStore)[towerTitle];
  const tasks = useStore(TasksStore);
  const missions = useStore(MissionsStore);
  const filteredTasks = filterTasksArray(tasks, towerTitle);
  const filteredMissions = filterTasksArray(missions, towerTitle);
  const { volume } = useStore(SettingsStore).sound;
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
      reactGAEvent({
        eventLabel: 'razblokirovat',
        eventCategory: 'onboarding',
        eventAction: 'button_click',
        eventContent: 'sotovaya_svyaz',
        eventContext: 'step10',
        filterName: 'opisanie',
      });
      openDescriptionTab();
    } else if (towerTutorialStep === TowerTutorialSteps.DESCRIPTION_OPENED) {
      openChatTab();
      reactGAEvent({
        eventLabel: 'chto_dalshe',
        eventCategory: 'onboarding',
        eventAction: 'button_click',
        eventContent: 'sotovaya_svyaz',
        eventContext: 'step11',
        filterName: 'opisanie',
      });
    } else if (towerTutorialStep === TowerTutorialSteps.CHAT_OPENED) {
      openTasksTab();
      nextTutorStep();
      reactGAEvent({
        eventLabel: 'chto_dalshe',
        eventCategory: 'onboarding',
        eventAction: 'button_click',
        eventContent: 'sotovaya_svyaz',
        eventContext: 'step12',
        filterName: 'chat',
      });
    }
  };

  const showButton =
    tutorialCondition === TutorialConditions.NEXT_BUTTON_TOWER_INFO &&
    towerTutorialStep !== TowerTutorialSteps.DESCRIPTION_DONT_OPENED;

  const showUnblockButton =
    tutorialCondition === TutorialConditions.NEXT_BUTTON_TOWER_INFO &&
    towerTutorialStep === TowerTutorialSteps.DESCRIPTION_DONT_OPENED;

  const hideDescription =
    tutorialCondition !== TutorialConditions.OFF &&
    towerTutorialStep === TowerTutorialSteps.DESCRIPTION_DONT_OPENED;

  useEffect(() => {
    towerInfoRef.current &&
      setTowerInfoShift(towerInfoRef.current?.offsetWidth);
  }, [towerInfoRef]);

  useHideEmptyTaskMarker({ filteredTasks, filteredMissions, towerTitle });
  const switchers = {
    openChatTab,
    openDescriptionTab,
    openTasksTab,
  };
  const towerInfoIndicatorsProps = {
    points,
    maxProgressValue,
    level,
    towerTitle,
    progress: levelUpPercentage,
    income,
    hideTowerInfo,
    tutorialCondition,
  };
  const towerInfoTitleProps = {
    tutorialCondition,
    towerTitle,
    factors,
    subscriptionText,
  };
  const towerInfoMenuProps = {
    isChatEnded: ended,
    refsCollection,
    selectTowerInfoContent,
    towerTitle,
  };
  const towerInfoContentProps = {
    switchers,
    selectedMenu: selectTowerInfoContent,
    productDescription: returnDescriptionObject(),
    towerTitle,
    hideDescription,
  };
  const buttonProps = {
    pulseAnimFlag: showButton,
    className: ButtonClassNames.OUTLINE_NORMAL,
    callback: () => nextTowerTutorialStep(),
  };
  const unlockButtonProps = {
    pulseAnimFlag: showUnblockButton,
    className: ButtonClassNames.NORMAL,
    callback: () => nextTowerTutorialStep(),
  };
  return (
    <TowerInfoLayout
      unlockButtonProps={unlockButtonProps}
      buttonProps={buttonProps}
      towerInfoContentProps={towerInfoContentProps}
      towerInfoMenuProps={towerInfoMenuProps}
      towerInfoTitleProps={towerInfoTitleProps}
      towerInfoIndicatorsProps={towerInfoIndicatorsProps}
      tutorialCondition={tutorialCondition}
      isExtraTowerInfoModalOpen={isExtraTowerInfoModalOpen}
      towerInfoDisplayFlag={hideTowerInfo}
      showButton={showButton}
      showUnblockButton={showUnblockButton}
      towerInfoRef={towerInfoRef}
    />
  );
};

export interface ITabSwitchers {
  openDescriptionTab: () => void;
  openChatTab: () => void;
  openTasksTab: () => void;
}

export default TowerInfo;

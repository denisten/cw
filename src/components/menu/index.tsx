import React, { useEffect } from 'react';
import { ExitButton } from '../../UI/exit-button';
import { MenuItems } from '../../UI/menu-paragraph';
import { useStore } from 'effector-react';
import { AppConditionStore } from '../../effector/app-condition/store';
import { RowWrapper } from '../../UI/row-wrapper';
import { ColumnWrapper } from '../../UI/column-wrapper';
import { Overlay } from '../../UI/overlay';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { TutorialStore } from '../../effector/tutorial-store/store';
import { pauseTutorialMode } from '../../effector/tutorial-store/events';
import styled from 'styled-components';
import { TasksStore } from '../../effector/tasks-store/store';
import { MenuItemsComponent } from './menu-items';
import { MenuContent } from './menu-content';
import { useHandleAuth } from '../../hooks/use-handle-auth';
import { MenuStore } from '../../effector/menu-store/store';
import { menuOpened, menuClosed } from '../../effector/menu-store/events';
import { useAuthCanceledStatus } from '../../hooks/use-auth-canceled-status';
import { reactGAEvent } from '../../utils/ga-event';

const ExpandedColumnWrapper = styled(ColumnWrapper)`
  height: 456px;
  width: auto;
  z-index: ${ZIndexes.UI_BUTTON};
`;
const StyledConfig = {
  exitButton: {
    top: '-1%',
    right: '-4%',
    hoverFlag: true,
    zIndex: ZIndexes.UI_BUTTON,
  },
  rowWrapper: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    zIndex: ZIndexes.MENU,
  },
};

export const Menu = () => {
  const { isAuthorized, dataReceived, authCancelledStatus } = useStore(
    AppConditionStore
  );

  const { selectedMenuItem } = useStore(MenuStore);
  const { tutorialCondition } = useStore(TutorialStore);
  const missions = useStore(TasksStore);
  const currentAlertsList: MenuItems[] = [];

  useHandleAuth({ isAuthorized, dataReceived });
  useAuthCanceledStatus(authCancelledStatus);
  useEffect(() => {
    missions.length && currentAlertsList.push(MenuItems.TASKS);
  }, []);

  const handler = (item: MenuItems) => {
    reactGAEvent({
      eventLabel: item,
      eventCategory: 'profile',
    });
    menuOpened(item);
  };

  const handleExitButtonClick = () => {
    pauseTutorialMode();
    menuClosed();
  };

  return (
    <Overlay displayFlag={!!selectedMenuItem} {...StyledConfig.overlay}>
      <ExpandedColumnWrapper displayFlag={!!selectedMenuItem}>
        <ExitButton
          displayFlag={!tutorialCondition}
          {...StyledConfig.exitButton}
          callBack={handleExitButtonClick}
        />
        <RowWrapper {...StyledConfig.rowWrapper}>
          <MenuItemsComponent
            currentAlertsList={currentAlertsList}
            selectedMenuItem={selectedMenuItem || MenuItems.PROFILE}
            callBack={handler}
          />
          <MenuContent content={selectedMenuItem || MenuItems.PROFILE} />
        </RowWrapper>
      </ExpandedColumnWrapper>
    </Overlay>
  );
};

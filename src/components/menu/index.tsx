import React, { useEffect } from 'react';
import { ExitButton } from '../../UI/exit-button';
import { menuClosed, menuOpened } from '../../effector/app-condition/events';
import { MenuItemsComponent, noAuthAvailableMenuItems } from '../menu-items';
import { MenuContent } from '../menu-content';
import { MenuItems } from '../../UI/menu-paragraph';
import { useStore } from 'effector-react';
import { AppCondition } from '../../effector/app-condition/store';
import { RowWrapper } from '../../UI/row-wrapper';
import { ColumnWrapper } from '../../UI/column-wrapper';
import { Overlay } from '../../UI/overlay';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { TutorialStore } from '../../effector/tutorial-store/store';
import { pauseTutorialMode } from '../../effector/tutorial-store/events';
import styled from 'styled-components';
import { IDisplayFlag } from '../skip-tutorial';
import { MissionsStore } from '../../effector/missions-store/store';

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
    zIndex: ZIndexes.MODAL,
  },
};

const ExpandedColumnWrapper = styled(ColumnWrapper)`
  height: 456px;
  width: auto;
  z-index: 20;
`;

const Menu: React.FC<IDisplayFlag> = ({ displayFlag }) => {
  const { selectedMenuItem, isAuthorized } = useStore(AppCondition);
  const { tutorialCondition } = useStore(TutorialStore);
  const missions = useStore(MissionsStore);
  const currentAlertsList: MenuItems[] = [];

  useEffect(() => {
    if (missions.length) currentAlertsList.push(MenuItems.TASKS);
  }, []);

  const menuItemsComponentCallBack = (item: MenuItems) => {
    if (isAuthorized || noAuthAvailableMenuItems.includes(item)) {
      menuOpened(item);
    }
  };

  const handleExitButtonClick = () => {
    pauseTutorialMode();
    menuClosed();
  };
  return (
    <Overlay displayFlag={displayFlag} {...StyledConfig.overlay}>
      <ExpandedColumnWrapper displayFlag={displayFlag}>
        <ExitButton
          displayFlag={!tutorialCondition}
          {...StyledConfig.exitButton}
          callBack={handleExitButtonClick}
        />
        <RowWrapper {...StyledConfig.rowWrapper}>
          <MenuItemsComponent
            isAuthorized={isAuthorized}
            currentAlertsList={currentAlertsList}
            selectedMenuItem={selectedMenuItem || MenuItems.PROFILE}
            callBack={menuItemsComponentCallBack}
          />
          <MenuContent content={selectedMenuItem || MenuItems.PROFILE} />
        </RowWrapper>
      </ExpandedColumnWrapper>
    </Overlay>
  );
};

export default Menu;

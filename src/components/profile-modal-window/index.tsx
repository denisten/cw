import React from 'react';
import { ExitButton } from '../../UI/exit-button';
import { menuClosed, menuOpened } from '../../effector/app-condition/events';
import { MenuItemsComponent } from '../menu-items';
import { MenuContent } from '../menu-content';
import { MenuItems } from '../../UI/menu-paragraph';
import { useStore } from 'effector-react';
import { AppCondition } from '../../effector/app-condition/store';
import { Directions } from '../../UI/tutorial-arrow';
import { RowWrapper } from '../../UI/row-wrapper';
import { ColumnWrapper } from '../../UI/column-wrapper';
import { Overlay } from '../../UI/overlay';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { TutorialStore } from '../../effector/tutorial-store/store';
import { pauseTutorialMode } from '../../effector/tutorial-store/events';
import styled from 'styled-components';
import { device } from '../../UI/media';

const StyledConfig = {
  exitButton: {
    top: '-4%',
    right: '-2%',
    hoverFlag: true,
    zIndex: ZIndexes.UI_BUTTON,
  },
  avatar: {
    height: '13%',
    top: '4.7%',
    left: '36.8%',
  },
  saveButton: {
    height: '7%',
    bottom: '0%',
    left: '50%',
    transformTranslate: '-50%, -50%',
    hoverFlag: true,
  },
  tutorialArrow: {
    direction: Directions.LEFT,
    range: 2,
    top: '20%',
    left: '20%',
  },
  rowWrapper: {
    width: '100%',
    height: '100%',
  },
  header: {
    height: '85px',
  },
  overlay: {
    zIndex: ZIndexes.MODAL,
  },
};

const ExpandedColumnWrapper = styled(ColumnWrapper)`
    height: 456px;
    width: 1045px;
    zIndex: 20;
  // @media ${device.laptopL} {
  //  height: 90%;
  //  width: 90%;
  //}
`;

export const Menu: React.FC<{ displayFlag: boolean }> = ({ displayFlag }) => {
  const { selectedMenuItem } = useStore(AppCondition);

  const { tutorialCondition } = useStore(TutorialStore);
  const menuItemsComponentCallBack = (item: MenuItems) => {
    menuOpened(item);
  };
  return (
    <Overlay displayFlag={displayFlag} {...StyledConfig.overlay}>
      <ExpandedColumnWrapper displayFlag={displayFlag}>
        {!tutorialCondition ? (
          <ExitButton
            {...StyledConfig.exitButton}
            callBack={() => {
              pauseTutorialMode();

              menuClosed();
            }}
          />
        ) : null}
        <RowWrapper {...StyledConfig.rowWrapper}>
          <MenuItemsComponent
            tutorialCondition={tutorialCondition}
            currentNotifysList={[MenuItems.TASKS, MenuItems.FEEDBACK]} // TODO get real data from somewhere
            selectedMenuItem={selectedMenuItem || MenuItems.PROFILE}
            callBack={menuItemsComponentCallBack}
          />
          <MenuContent content={selectedMenuItem || MenuItems.PROFILE} />
        </RowWrapper>
      </ExpandedColumnWrapper>
    </Overlay>
  );
};

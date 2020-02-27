import React, { Fragment } from 'react';
import { TutorialConditions } from '../../effector/app-condition/store';
import { Directions, TutorialArrow } from '../../UI/tutorial-arrow';
import { TutorialDialog } from '../../components/tutorial-dialog';

type ArrowsContainerProps = {
  tutorialCondition: TutorialConditions;
  isInsideScrollContainer: boolean;
};
export const TutorialToolsSelector: React.FC<ArrowsContainerProps> = ({
  tutorialCondition,
  isInsideScrollContainer,
}) => {
  switch (tutorialCondition) {
    case TutorialConditions.MENU_ARROW:
    case TutorialConditions.MENU_ARROW_2:
      if (!isInsideScrollContainer)
        return (
          <TutorialArrow
            top={12}
            left={4}
            range={2}
            direction={Directions.TOP}
          />
        );
      else return <Fragment />;
    case TutorialConditions.CHANGE_CITY_NAME_ARROW:
      return (
        <TutorialArrow
          top={53}
          left={67}
          range={2}
          direction={Directions.LEFT}
        />
      );
    case TutorialConditions.TOWER_ARROW:
      if (isInsideScrollContainer)
        return (
          <TutorialArrow
            top={27.5}
            left={47.4}
            range={1}
            direction={Directions.BOTTOM}
          />
        );
      else return <Fragment />;
    case TutorialConditions.UPGRADE_ARROW:
      if (isInsideScrollContainer)
        return (
          <TutorialArrow
            top={29}
            left={46.4}
            range={0.5}
            direction={Directions.RIGHT}
          />
        );
      else return <Fragment />;
    case TutorialConditions.OFF:
      return <TutorialDialog />;
    case TutorialConditions.SAVE_CITY_NAME_ARROW:
      return (
        <TutorialArrow
          top={70}
          left={49}
          range={2}
          direction={Directions.BOTTOM}
        />
      );
    case TutorialConditions.AUTH_ARROW:
      return (
        <TutorialArrow
          top={57}
          left={56}
          range={2}
          direction={Directions.TOP}
        />
      );
    default:
      return <Fragment />;
  }
};

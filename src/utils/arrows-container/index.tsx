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
    case TutorialConditions.PROFILE_ARROW:
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
    case TutorialConditions.UPGRADE_ARROW:
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
    case TutorialConditions.DIALOG:
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
    default:
      return <Fragment />;
  }
};

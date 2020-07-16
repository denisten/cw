import React, { Fragment } from 'react';
import { Directions, TutorialArrow } from '../../UI/tutorial-arrow';
import { TutorialDialog } from '../../components/tutorial-dialog';
import { TutorialConditions } from '../../effector/tutorial-store/store';

type ArrowsContainerProps = {
  tutorialCondition: TutorialConditions;
  isInsideScrollContainer: boolean;
};
const TutorialToolsSelector: React.FC<ArrowsContainerProps> = ({
  tutorialCondition,
  isInsideScrollContainer,
}) => {
  switch (tutorialCondition) {
    case TutorialConditions.ARROW_TOWER_INFO:
      if (isInsideScrollContainer)
        return (
          <TutorialArrow
            top={30.5}
            left={51.8}
            range={1}
            direction={Directions.BOTTOM}
          />
        );
      else return <Fragment />;
    case TutorialConditions.DIALOG_HELLO:
      if (!isInsideScrollContainer)
        return <TutorialDialog mustBeAsAnimated={true} />;
      else return <Fragment />;
    case TutorialConditions.DIALOG_CONFIRM_CITY_NAME:
    case TutorialConditions.DIALOG_START_MISSION:
    case TutorialConditions.DIALOG_AUTH:
      if (!isInsideScrollContainer) return <TutorialDialog />;
      else return <Fragment />;
    default:
      return <Fragment />;
  }
};

export default TutorialToolsSelector;

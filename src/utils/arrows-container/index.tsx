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
    case TutorialConditions.DIALOG:
      if (!isInsideScrollContainer) return <TutorialDialog />;
      else return <Fragment />;
    default:
      return <Fragment />;
  }
};

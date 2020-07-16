import React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { RewardStore } from '../../effector/reward/store';
import { TutorialStore } from '../../effector/tutorial-store/store';
import { ProfileButton } from '../../UI/profile-button';
import { Toolbar } from '../../UI/toolbar';
import { TutorialSliderButton } from '../../UI/tutorial-slider-button';

const UIButtonInterfaceWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;
const UIButtonInterface = () => {
  const { isCoinRelocateAnimationEnded } = useStore(RewardStore);
  const { tutorialCondition, tutorialPause } = useStore(TutorialStore);

  return (
    <UIButtonInterfaceWrapper>
      <ProfileButton
        tutorialCondition={tutorialCondition}
        tutorialPause={tutorialPause}
        isCoinRelocateAnimationEnded={isCoinRelocateAnimationEnded}
      />
      <Toolbar />
      <TutorialSliderButton />
    </UIButtonInterfaceWrapper>
  );
};
export default UIButtonInterface;

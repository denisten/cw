import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ZIndexes } from '../root-component/z-indexes-enum';
import tutorialBackground from './tutorial-background.svg';
import {
  nextTutorStep,
  disableTutorialMode,
} from '../../effector/tutorial-store/events';
import { useStore } from 'effector-react';
import {
  TutorialConditions,
  TutorialStore,
} from '../../effector/tutorial-store/store';
import {
  IDialogData,
  TutorialDialogTextsService,
} from './dialog-messages-service';
import { Sprite } from '../sprite';
import supportSprite from '../../img/assistant/assistant.png';
import { UserDataStore } from '../../effector/user-data/store';
import { Button, ButtonClassNames } from '../../UI/button';
import { Span, StyledSpan } from '../../UI/span';
import { MTSSans } from '../../fonts';
import { AppConditionStore } from '../../effector/app-condition/store';
import { delayBeforePreloaderOff } from '../../constants';
import { handleAuthButtonClick } from '../../utils/handle-auth-button-click';
import { ExitButton } from '../../UI/exit-button';
import { SettingsStore } from '../../effector/settings/store';
import { useAudio } from '../../hooks/use-sound';
import assistantSound from '../../sound/assistant-sound.mp3';
import { usePrintDialogMessage } from '../../hooks/use-print-dialog-message';
import { reactGAEvent } from '../../utils/ga-event';
import { useHandleBackgroundOnload } from '../../hooks/use-handle-background-onload';

const TutorialDialogWrapper = styled.div`
  width: 1128px;
  height: 263px;
  background-image: url(${tutorialBackground});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  padding-left: 3%;
  box-sizing: border-box;
  font-size: 25px;
  line-height: 24px;
  margin: 0 auto;
  position: relative;
`;

const SupportSpriteWrapper = styled.div`
  position: relative;
  margin-right: 3%;
  width: auto;
  height: 100%;
  bottom: 56px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding-top: 43px;
  padding-right: 76px;
  flex-grow: 1;
`;

const TutorialDialogText = styled(StyledSpan)`
  line-height: 28px;
  color: #001424;
  padding-right: 1%;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  box-sizing: border-box;
  font-family: ${MTSSans.MEDIUM}, serif;
`;

const tutorialShowAnimation = keyframes`
from {
  transform: translateY(500px);
}
to {
  transform: translateY(0px);
}
`;

const MainWrapper = styled.div<IMainWrapper>`
  width: 100%;
  height: 36.5%;
  position: absolute;
  bottom: 0;
  z-index: ${ZIndexes.TUTORIAL};
  display: flex;
  align-items: center;
  animation: ${props =>
      props.DOMLoaded && props.mustBeAsAnimated ? tutorialShowAnimation : ''}
    0.4s ${delayBeforePreloaderOff}ms both;
`;

const styleConfig = {
  exitButton: {
    position: 'absolute',
    top: '4%',
    right: '0%',
    displayFlag: true,
  },
  sprite: {
    canvasWidth: 224,
    canvasHeight: 304,
    numberOfFramesX: 10,
    numberOfFramesY: 9,
    ticksPerFrame: 2,
  },
  backButton: {
    width: 252,
    height: 50,
    style: {
      margin: '0 23px 0 0',
    },
  },
  forwardButton: {
    width: 252,
    height: 50,
  },
  tutorialDialogTitle: {
    fontFamily: MTSSans.BLACK,
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 1.25,
    letterSpacing: '-0.5px',
    margin: '0 0 8px 0',
  },
};

const minStepsCountToSkipTutorial = 1;

const isNowFirstStepOfTutorial = (
  dialogStep: number,
  tutorialCondition: TutorialConditions
) => {
  return (
    dialogStep < minStepsCountToSkipTutorial &&
    tutorialCondition === TutorialConditions.DIALOG_HELLO
  );
};

export const TutorialDialog: React.FC<ITutorialDialog> = ({
  mustBeAsAnimated,
  content,
  closeCallback,
}) => {
  const { worldName } = useStore(UserDataStore);
  const { DOMLoaded } = useStore(AppConditionStore);
  const { volume } = useStore(SettingsStore).sound;
  const { tutorialCondition, tutorialOnAuthorizedUser } = useStore(
    TutorialStore
  );

  const [printedText, setPrintedText] = useState('');
  const [dialogStep, setDialogStep] = useState(0);
  const [isPrinting, setIsPrinting] = useState(false);

  const { messages, buttonContent, titles, reload, action } =
    content || TutorialDialogTextsService.getCurrentText(tutorialCondition);

  const currentMessage = messages[dialogStep];
  const canPlaySound = tutorialCondition !== 0 && volume && DOMLoaded;

  const { play: playAssistantSound } = useAudio(assistantSound, false, volume);

  useEffect(() => {
    DOMLoaded && tutorialCondition && volume && playAssistantSound();
  }, [tutorialCondition, DOMLoaded]);

  usePrintDialogMessage({
    DOMLoaded,
    setPrintedText,
    setIsPrinting,
    currentMessage,
    dialogStep,
    reload,
  });

  const handleClick = (
    eventLabel: string,
    eventContent: string,
    eventContext: string
  ) => {
    reactGAEvent({
      eventLabel,
      eventCategory: 'onboarding',
      eventAction: 'button_click',
      eventContent,
      eventContext,
    });
    if (!isPrinting) {
      if (action && action.step === dialogStep) action.callBack();
      if (tutorialCondition === TutorialConditions.FINAL_DIALOG_WITH_AUTH_USER)
        return;
      if (messages.length !== dialogStep + 1) {
        setDialogStep(dialogStep + 1);
        canPlaySound && playAssistantSound();
      } else {
        if (tutorialCondition) nextTutorStep();
        else closeCallback();
      }
    }
  };

  const handleBackButtonClick = () => {
    if (isNowFirstStepOfTutorial(dialogStep, tutorialCondition)) {
      handleAuthButtonClick();
      disableTutorialMode();
      reactGAEvent({
        eventLabel: 'u_menya_uzhe_est_gorod',
        eventCategory: 'onboarding',
        eventAction: 'button_click',
        eventContent: 'dobro_pozhalovat',
        eventContext: 'step1',
      });
    } else if (dialogStep) {
      setDialogStep(dialogStep - 1);
      reactGAEvent({
        eventLabel: 'nazad',
        eventCategory: 'onboarding',
        eventAction: 'button_click',
        eventContent: buttonContent[dialogStep]?.eventContent || '',
        eventContext: buttonContent[dialogStep]?.eventContext || '',
      });
    }
  };

  useHandleBackgroundOnload(tutorialBackground);

  return (
    <MainWrapper DOMLoaded={DOMLoaded} mustBeAsAnimated={mustBeAsAnimated}>
      <TutorialDialogWrapper data-render={true}>
        {tutorialCondition !== TutorialConditions.FINAL_DIALOG_WITH_AUTH_USER &&
          !isNowFirstStepOfTutorial(dialogStep, tutorialCondition) && (
            <ExitButton
              callBack={() => {
                reactGAEvent({
                  eventLabel: 'zakryt',
                  eventCategory: 'onboarding',
                  eventContent: buttonContent[dialogStep]?.eventContent || '',
                  eventContext: buttonContent[dialogStep]?.eventContext || '',
                });
                closeCallback();
              }}
              {...styleConfig.exitButton}
            />
          )}
        <SupportSpriteWrapper>
          <Sprite img={supportSprite} {...styleConfig.sprite} />
        </SupportSpriteWrapper>
        <TextWrapper>
          <Span
            {...styleConfig.tutorialDialogTitle}
            content={titles[dialogStep]}
          />
          <TutorialDialogText>
            <Span
              content={
                tutorialCondition ===
                TutorialConditions.DIALOG_CONFIRM_CITY_NAME
                  ? worldName
                  : ''
              }
            />
            {printedText}
          </TutorialDialogText>
          <ButtonWrapper>
            {!isPrinting && (
              <>
                {(dialogStep ||
                  (tutorialCondition === TutorialConditions.DIALOG_HELLO &&
                    !tutorialOnAuthorizedUser)) && (
                  <Button
                    className={ButtonClassNames.OUTLINE_NORMAL}
                    callback={handleBackButtonClick}
                    content={
                      isNowFirstStepOfTutorial(dialogStep, tutorialCondition)
                        ? 'У меня уже есть город'
                        : 'Назад'
                    }
                    {...styleConfig.backButton}
                  />
                )}
                <Button
                  callback={() =>
                    handleClick(
                      buttonContent[dialogStep].eventLabel,
                      buttonContent[dialogStep].eventContent,
                      buttonContent[dialogStep].eventContext
                    )
                  }
                  className={ButtonClassNames.NORMAL}
                  content={buttonContent[dialogStep].name}
                  {...styleConfig.forwardButton}
                />
              </>
            )}
          </ButtonWrapper>
        </TextWrapper>
      </TutorialDialogWrapper>
    </MainWrapper>
  );
};

interface IMainWrapper {
  DOMLoaded?: boolean;
  mustBeAsAnimated?: boolean;
}

interface ITutorialDialog {
  content?: IDialogData;
  mustBeAsAnimated?: boolean;
  closeCallback: Function;
}

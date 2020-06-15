import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ZIndexes } from '../root-component/z-indexes-enum';
import tutorialBackground from './tutorial-background.svg';
import {
  nextTutorStep,
  turnOffTutorialMode,
} from '../../effector/tutorial-store/events';
import { useStore } from 'effector-react';
import {
  TutorialConditions,
  TutorialStore,
} from '../../effector/tutorial-store/store';
import { ExitButton } from '../../UI/exit-button';
import { TutorialDialogTextsService } from './dialog-messages-service';
import { Sprite } from '../sprite';
import supportSprite from '../../img/assistant/assistant.png';
import { UserDataStore } from '../../effector/user-data/store';
import { Button, ButtonClassNames } from '../../UI/button';
import { Span, StyledSpan } from '../../UI/span';
import { MTSSans } from '../../fonts';
import { AppCondition } from '../../effector/app-condition/store';
import { delayBeforePreloaderOff } from '../../constants';

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
  font-family: MTSSansMedium, serif;
`;
const tutorialShowAnimation = keyframes`
from {
  transform: translateY(500px);
}
to {
  transform: translateY(0px);
}
`;

const MainWrapper = styled.div<{
  firstLoaded?: boolean;
  mustBeAsAnimated?: boolean;
}>`
  width: 100%;
  height: 36.5%;
  position: absolute;
  bottom: 0;
  z-index: ${ZIndexes.TUTORIAL};
  display: flex;
  align-items: center;
  animation: ${props =>
      props.firstLoaded && props.mustBeAsAnimated ? tutorialShowAnimation : ''}
    0.4s ${delayBeforePreloaderOff}ms both;
`;

const delayBetweenDialogMessages = 600;
const delayBetweenLetterAppearing = 12;

const styleConfig = {
  exitButton: {
    position: 'absolute',
    top: '4%',
    right: '0%',
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
    margin: '0 23px 0 0',
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

const isNowFirstStepOfTutorial = (
  dialogStep: number,
  tutorialCondition: TutorialConditions
) => {
  return (
    dialogStep < 3 && tutorialCondition === TutorialConditions.DIALOG_HELLO
  );
};

export const TutorialDialog: React.FC<{ mustBeAsAnimated?: boolean }> = ({
  mustBeAsAnimated,
}) => {
  const [printedText, setPrintedText] = useState('');
  const [dialogStep, setDialogStep] = useState(0);
  const [isPrinting, setIsPrinting] = useState(false);
  const { tutorialCondition } = useStore(TutorialStore);
  const { worldName } = useStore(UserDataStore);
  const { DOMLoaded } = useStore(AppCondition);

  const {
    messages,
    buttonContent,
    titles,
    reload,
    action,
  } = TutorialDialogTextsService.getCurrentText(tutorialCondition);

  const currentMessage = messages[dialogStep];
  let letterByLetterCallback: number;

  useEffect(() => {
    if (!DOMLoaded) return;
    setPrintedText('');
    clearTimeout(letterByLetterCallback);
    setIsPrinting(true);
    const timeoutBetweenDialogMessages = setTimeout(() => {
      for (let i = 0; i < currentMessage.length; i++) {
        letterByLetterCallback = setTimeout(() => {
          setPrintedText(state => (state += currentMessage[i]));
          if (i + 1 === currentMessage.length) {
            setIsPrinting(false);
          }
        }, delayBetweenLetterAppearing * i);
      }
    }, delayBetweenDialogMessages);
    return () => {
      clearTimeout(timeoutBetweenDialogMessages);
      clearTimeout(letterByLetterCallback);
    };
  }, [dialogStep, reload, DOMLoaded]);

  const handleClick = () => {
    if (!isPrinting) {
      if (action && action.step === dialogStep) {
        action.callBack();
      }
      if (messages.length !== dialogStep + 1) {
        setDialogStep(dialogStep + 1);
      } else {
        nextTutorStep();
      }
    }
  };

  const handleBackButtonClick = () => {
    if (isNowFirstStepOfTutorial(dialogStep, tutorialCondition)) {
      turnOffTutorialMode();
    } else if (dialogStep) {
      setDialogStep(dialogStep - 1);
    }
  };
  return (
    <MainWrapper firstLoaded={DOMLoaded} mustBeAsAnimated={mustBeAsAnimated}>
      <TutorialDialogWrapper>
        <ExitButton
          displayFlag={true}
          callBack={() => turnOffTutorialMode()}
          {...styleConfig.exitButton}
        />
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
            <Button
              className={
                isNowFirstStepOfTutorial(dialogStep, tutorialCondition) ||
                dialogStep
                  ? ButtonClassNames.OUTLINE_NORMAL
                  : ButtonClassNames.OUTLINE_DISABLED
              }
              displayFlag={!isPrinting}
              callback={handleBackButtonClick}
              content={
                isNowFirstStepOfTutorial(dialogStep, tutorialCondition)
                  ? 'Пропустить обучение'
                  : 'Назад'
              }
              {...styleConfig.backButton}
            />
            <Button
              displayFlag={!isPrinting}
              callback={handleClick}
              className={ButtonClassNames.NORMAL}
              content={buttonContent[dialogStep]}
              {...styleConfig.forwardButton}
            />
          </ButtonWrapper>
        </TextWrapper>
      </TutorialDialogWrapper>
    </MainWrapper>
  );
};

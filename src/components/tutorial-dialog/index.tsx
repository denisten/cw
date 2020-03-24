import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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

const TutorialDialogTitle = styled.span`
  font-family: MTSSansBlack, sans-serif;
  font-size: 32px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: -0.5px;
  color: #01acc8;
  margin-bottom: 8px;
`;

const TutorialDialogText = styled.span`
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 28px;
  letter-spacing: normal;
  color: #001424;
  padding-right: 1%;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const WorldNameWrapper = styled.span`
  color: #01acc8;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  font-family: MTSSansBold;
`;

const CustomButton = styled.div<ICustomButton>`
  width: 232px;
  height: 50px;
  display: ${props => (props.textGenerating ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
  border-radius: 2px;
  box-shadow: 1px 1px 4px 0 #bbc1c7, inset 0 1px 3px 0 rgba(255, 255, 255, 0.5);
  background-color: #02acc8;
  font-size: 16px;
  font-weight: bold;
`;

const BackButton = styled(CustomButton)<IBackButton>`
  border: solid 2px #${props => (props.borderFlag ? '02acc8' : 'e2e5eb')};
  box-sizing: border-box;
  background-color: #f4f4f4;
  display: ${props => (props.textGenerating ? 'none' : 'flex')};
  box-shadow: none;
  color: #${props => (props.borderFlag ? '02acc8' : 'e2e5eb')};
  margin-right: 24px;
`;

const ButtonWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  box-sizing: border-box;
  font-family: MTSSansMedium, serif;
`;

const MainWrapper = styled.div`
  width: 100%;
  height: 36.5%;
  position: absolute;
  bottom: 0;
  z-index: ${ZIndexes.TUTORIAL};
  display: flex;
  align-items: center;
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
    fullImgWidth: 2240,
    fullImgHeight: 2736,
    canvasWidth: 224,
    canvasHeight: 304,
    numberOfFramesX: 10,
    numberOfFramesY: 9,
    ticksPerFrame: 2,
  },
};

export const TutorialDialog: React.FC = () => {
  const [printedText, setPrintedText] = useState('');
  const [dialogStep, setDialogStep] = useState(0);
  const [isPrinting, setIsPrinting] = useState(false);
  const { tutorialCondition } = useStore(TutorialStore);
  const { worldName } = useStore(UserDataStore);

  const {
    messages,
    buttonContent,
    titles,
    reload,
  } = TutorialDialogTextsService.getCurrentText(tutorialCondition);

  const currentMessage = messages[dialogStep];
  let letterByLetterCallback: number;

  useEffect(() => {
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
  }, [dialogStep, reload]);

  const handleExitButtonClick = () => {
    turnOffTutorialMode();
  };

  const handleClick = () => {
    if (!isPrinting) {
      if (messages.length !== dialogStep + 1) {
        setDialogStep(dialogStep + 1);
      } else {
        nextTutorStep();
      }
    }
  };

  const handleBackButtonClick = () => {
    if (dialogStep) setDialogStep(dialogStep - 1);
  };
  return (
    <MainWrapper>
      <TutorialDialogWrapper>
        <ExitButton
          callBack={handleExitButtonClick}
          {...styleConfig.exitButton}
        />
        <SupportSpriteWrapper>
          <Sprite img={supportSprite} {...styleConfig.sprite} />
        </SupportSpriteWrapper>
        <TextWrapper>
          <TutorialDialogTitle>{titles[dialogStep]}</TutorialDialogTitle>
          <TutorialDialogText>
            <WorldNameWrapper>
              {tutorialCondition === TutorialConditions.DIALOG_CONFIRM_CITY_NAME
                ? worldName
                : ''}
            </WorldNameWrapper>
            {printedText}
          </TutorialDialogText>
          <ButtonWrapper>
            <BackButton
              borderFlag={!!dialogStep}
              textGenerating={isPrinting}
              onClick={handleBackButtonClick}
            >
              Назад
            </BackButton>
            <CustomButton textGenerating={isPrinting} onClick={handleClick}>
              {buttonContent[dialogStep]}
            </CustomButton>
          </ButtonWrapper>
        </TextWrapper>
      </TutorialDialogWrapper>
    </MainWrapper>
  );
};

interface ICustomButton {
  textGenerating: boolean;
}

interface IBackButton extends ICustomButton {
  borderFlag: boolean;
}

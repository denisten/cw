import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import supportImg from './support.png';
import { ZIndexes } from '../root-component/z-indexes-enum';
import tutorialBackground from './tutorial-background.svg';
import {
  nextTutorStep,
  turnOffTutorialMode,
} from '../../effector/tutorial-store/events';
import { useStore } from 'effector-react';
import { TutorialStore } from '../../effector/tutorial-store/store';
import { ExitButton } from '../../UI/exit-button';
import { TutorialDialogTextsService } from './dialog-messages-service';

const TutorialDialogWrapper = styled.div`
  width: 88.1%;
  height: 100%;
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

const SupportImgWrapper = styled.img`
  position: relative;
  margin-right: 3%;
  width: auto;
  height: 100%;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 3%;
  padding-right: 2%;
  flex-grow: 1;
`;

const TutorialDialogTitle = styled.span`
  font-family: MTSSansBold, sans-serif;
  font-size: 3.6vh;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: -0.5px;
  color: #01acc8;
  margin-bottom: 2%;
`;

const TutorialDialogText = styled.span`
  font-size: 2vh;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.3;
  letter-spacing: normal;
  color: #001424;
`;

const CustomButton = styled.div<ICustomButton>`
  width: 20vw;
  height: 7vh;
  display: ${props => (props.textGenerating ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
  margin-right: 2%;
  border-radius: 2px;
  box-shadow: 1px 1px 4px 0 #bbc1c7, inset 0 1px 3px 0 rgba(255, 255, 255, 0.5);
  background-color: #02acc8;
`;

const BackButton = styled(CustomButton)<ICustomButton>`
  border: solid 2px #e2e5eb;
  box-sizing: border-box;
  background-color: #f4f4f4;
  display: ${props => (props.textGenerating ? 'none' : 'flex')};
  color: #e2e5eb;
`;

const ButtonWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding-bottom: 6%;
  padding-right: 4%;
  box-sizing: border-box;
`;

const MainWrapper = styled.div`
  width: 100%;
  height: 36.5%;
  position: absolute;
  bottom: 3.3%;
  z-index: ${ZIndexes.TUTORIAL};
`;

const delayBetweenDialogMessages = 600;
const delayBetweenLetterAppearing = 12;

const styleConfig = {
  exitButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '3em',
    width: '3em',
  },
};

export const TutorialDialog: React.FC = () => {
  const [printedText, setPrintedText] = useState('');
  const [dialogStep, setDialogStep] = useState(0);
  const [isPrinting, setIsPrinting] = useState(false);
  const { tutorialCondition } = useStore(TutorialStore);

  const {
    messages,
    buttonContent,
    titles,
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
  }, [dialogStep]);

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
        <SupportImgWrapper src={supportImg} />
        <TextWrapper>
          <TutorialDialogTitle>{titles[dialogStep]}</TutorialDialogTitle>
          <TutorialDialogText>{printedText}</TutorialDialogText>
          <ButtonWrapper>
            <BackButton
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

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import supportImg from './support.png';
import { nextTutorStep } from '../../effector/app-condition/events';
import { ZIndexes } from '../root-component/z-indexes-enum';
import tutorialBackground from './tutorial-background.svg';

type ButtonProps = {
  textGenerating: boolean;
};

const TutorialDialogWrapper = styled.div`
  width: 88.1%;
  height: 100%;
  background-image: url(${tutorialBackground});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  padding-left: 5%;
  //box-sizing: border-box;
  font-size: 25px;
  line-height: 24px;
  margin: 0 auto;
  border: 5px solid mediumpurple;
`;

const SupportImgWrapper = styled.img`
  position: relative;
  bottom: 18%;
  margin-right: 3.8%;
  width: auto;
  height: 100%;
  border: 4px solid green;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 4px solid red;
`;

const TutorialDialogTitle = styled.span`
  margin: 18% 0 3.4% 4%;
`;

const TutorialDialogText = styled.span`
  font-weight: normal;
  width: 84%;
  min-height: 40%;
`;

export const CustomButton = styled.div<ButtonProps>`
  width: 35%;
  height: 50%;
  border-radius: 8px;
  background-color: #5ee220;
  display: ${props => (props.textGenerating ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
  border: 1px solid;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: flex-end;
  padding: 0 15%;
  box-sizing: border-box;
`;

const MainWrapper = styled.div`
  width: 100%;
  height: 36.5%;
  position: absolute;
  bottom: 3.3%;
  z-index: ${ZIndexes.TUTORIAL};
`;

const onBoardingTexts = [
  'Этот мир – твое отражение! Заходи чаще, выполняй задания, собирай валюту и ты увидишь прогресс!',
  'Мир будет прекрасен! Но надо постараться. Впереди еще куча дел. Кстати, за каждое выполненное задание ты получишь валюту. Не забывай ее собирать!',
  'Каждый день тебя ждет что-то новенькое. Выбирай любое задание и вперед!',
];

const buttonContents = [
  'Ого! Как это сделать?',
  'Как это работает?',
  'Ну давай посмотрим!',
];

const delayBetweenDialogMessages = 600;
const delayBetweenLetterAppearing = 12;

export const TutorialDialog: React.FC = () => {
  const [usedTxt, setUsedTxt] = useState('');
  const [onBoardingState, setOnBoardingState] = useState(0);
  const [textGenerating, setTextGenerating] = useState(false);
  const title = 'Привет!';
  const txt = onBoardingTexts[onBoardingState];
  let letterByLetterCallback: number;
  useEffect(() => {
    setUsedTxt('');
    clearTimeout(letterByLetterCallback);
    setTextGenerating(true);
    const timeoutBetweenDialogMessages = setTimeout(() => {
      for (let i = 0; i < txt.length; i++) {
        letterByLetterCallback = setTimeout(() => {
          setUsedTxt(state => (state += txt[i]));
          if (i + 1 === txt.length) {
            setTextGenerating(false);
          }
        }, delayBetweenLetterAppearing * i);
      }
    }, delayBetweenDialogMessages);
    return () => {
      clearTimeout(timeoutBetweenDialogMessages);
      clearTimeout(letterByLetterCallback);
    };
  }, [onBoardingState]);

  const handleClick = () => {
    if (!textGenerating) {
      if (onBoardingTexts.length !== onBoardingState + 1)
        setOnBoardingState(onBoardingState + 1);
      else nextTutorStep();
    }
  };
  return (
    <MainWrapper>
      <TutorialDialogWrapper>
        <SupportImgWrapper src={supportImg} />
        <TextWrapper>
          <TutorialDialogTitle>{title}</TutorialDialogTitle>
          <TutorialDialogText>{usedTxt}</TutorialDialogText>
          <ButtonWrapper>
            <CustomButton textGenerating={textGenerating} onClick={handleClick}>
              {buttonContents[onBoardingState]}
            </CustomButton>
          </ButtonWrapper>
        </TextWrapper>
      </TutorialDialogWrapper>
    </MainWrapper>
  );
};

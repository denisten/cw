import React, { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Overlay } from '../../UI/overlay';
import background from './background.svg';
import decreaseImg from './decrease.svg';
import increaseImg from './increase.svg';
import { MTSSans } from '../../fonts';
import { ExitButton } from '../../UI/exit-button';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { ImagesCollection } from '../../UI/images-collection';

const defaultImgWrapperWidth = 781;

const TutorialSliderWrapper = styled.div`
  width: 781px;
  height: 527px;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: contain;
  padding-top: 36px;
  box-sizing: border-box;
  position: relative;
`;

const ImageWrapper = styled.div`
  height: 301px;
  width: 781px;
  overflow: hidden;
`;

const ImageCollectionWrapper = styled.div`
  height: 100%;
  display: flex;
  transition-timing-function: ease-in-out;
  transition-property: transform;
  transform: translateX(0);
  transition-duration: 0.3s;
`;

const DescriptionWrapper = styled.div`
  width: 781px;
  height: 190px;
  padding: 21px 47px 55px 73px;
  box-sizing: border-box;
`;

const Title = styled.div<ITitle>`
  font-family: ${MTSSans.BOLD};
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 2px;
  :after {
    content: "${props => props.content}";
  }
`;

const Description = styled.div<ITitle>`
  font-family: ${MTSSans.REGULAR};
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 20px;
  margin-bottom: 21px;
  :after {
    content: "${props => props.content}";
  }
`;

const IncreaseWrapper = styled.img`
  position: absolute;
  bottom: 66px;
  right: -24px;
  cursor: pointer;
`;

const DecreaseWrapper = styled.img`
  position: absolute;
  bottom: 66px;
  left: -24px;
  cursor: pointer;
`;

const StepView = styled.div`
  height: 10px;
  position: relative;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
`;

const StepViewElement = styled.div`
  width: 10px;
  height: 10px;
  margin-right: 7px;
  background: #e0eaee;
  border-radius: 100%;
  cursor: pointer;
  &.selected {
    background: #01acc8;
  }
`;

const styledConfig = {
  exitButton: {
    top: '5px',
    right: '-43px',
    displayFlag: true,
  },
};

const calculateCurrentStep = (step: number, arrLength: number) => {
  const currentStep: number = step % arrLength;
  if (currentStep === 0) return 0;
  else if (currentStep < 0) return arrLength + currentStep;
  else return step > 0 ? Math.abs(currentStep) : arrLength - 1 + currentStep;
};

export const TutorialSlider: React.FC<ITutorialSlider> = memo(
  ({ displayFlag, content, imgArray, callback }) => {
    const imageWrapperRef = useRef<HTMLDivElement>(null);
    const [step, setStep] = useState(0);
    const currentStep = calculateCurrentStep(step, imgArray.length);
    useEffect(() => {
      const request = requestAnimationFrame(() => {
        if (imageWrapperRef.current) {
          imageWrapperRef.current.style.transform = `translateX(${-currentStep *
            defaultImgWrapperWidth}px)`;
        }
      });
      return () => cancelAnimationFrame(request);
    }, [step]);

    return (
      <Overlay displayFlag={displayFlag} zIndex={ZIndexes.TUTORIAL_SLIDER}>
        <TutorialSliderWrapper>
          <ExitButton callBack={callback} {...styledConfig.exitButton} />
          <ImageWrapper>
            <ImageCollectionWrapper ref={imageWrapperRef}>
              <ImagesCollection imgArray={imgArray} />
            </ImageCollectionWrapper>
          </ImageWrapper>
          <DescriptionWrapper>
            <Title content={content[currentStep].title} />
            <Description content={content[currentStep].description} />
            <DecreaseWrapper
              src={decreaseImg}
              alt="decrease"
              onClick={() => setStep(step - 1)}
            />
            <IncreaseWrapper
              src={increaseImg}
              alt="increase"
              onClick={() => setStep(step + 1)}
            />
            <StepView>
              {imgArray.map((el, id) => {
                let className = '';
                if (id === currentStep) className = 'selected';
                return (
                  <StepViewElement
                    className={className}
                    key={el}
                    onClick={() => setStep(id)}
                  />
                );
              })}
            </StepView>
          </DescriptionWrapper>
        </TutorialSliderWrapper>
      </Overlay>
    );
  }
);

interface ITutorialSlider {
  displayFlag: boolean;
  content: IContentCollection[];
  imgArray: string[];
  callback: () => void;
}

export interface ITitle {
  content: string;
}

interface IContentCollection {
  title: string;
  description: string;
}

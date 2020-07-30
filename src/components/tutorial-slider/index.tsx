import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Overlay } from '../../UI/overlay';
import background from './background.svg';
import decreaseImg from './decrease.svg';
import increaseImg from './increase.svg';
import { MTSSans } from '../../fonts';
import { ExitButton } from '../../UI/exit-button';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { ImagesCollection } from '../../UI/images-collection';

const defaultImgWrapperWidth = 772;
const leftOffset = 3;

const TutorialSliderWrapper = styled.div<ITutorialSliderWrapper>`
  width: 772px;
  height: 456px;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  position: relative;
  left: ${props => (props.showOverlay ? 0 : leftOffset)}px;
`;

const ImageWrapper = styled.div<ITutorialSliderWrapper>`
  width: 772px;
  height: 301px;
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
  width: 713px;
  height: 190px;
  padding: 20px 46px 0 85px;
  box-sizing: border-box;
`;

const Title = styled.div<ITitle>`
  font-family: ${MTSSans.BOLD};
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
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
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 21px;
  :after {
    content: "${props => props.content}";
  }
`;

const IncreaseButton = styled.img.attrs({ src: increaseImg, alt: 'increase' })`
  position: absolute;
  bottom: 66px;
  right: 15px;
  cursor: pointer;
`;

const DecreaseButton = styled.img.attrs({ src: decreaseImg, alt: 'decrease' })`
  position: absolute;
  bottom: 66px;
  left: 15px;
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
  },
};

const calculateCurrentStep = (step: number, arrLength: number) => {
  const currentStep: number = step % arrLength;
  if (currentStep === 0) return 0;
  else if (currentStep < 0) return arrLength + currentStep;
  else return step > 0 ? Math.abs(currentStep) : arrLength - 1 + currentStep;
};

export const TutorialSlider: React.FC<ITutorialSlider> = ({
  displayFlag,
  content,
  imgArray,
  callback,
  showOverlay = true,
}) => {
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const stepViewCollectionRef = useRef<HTMLDivElement>(null);
  const step = useRef(0);
  let prevStep = calculateCurrentStep(step.current, imgArray.length);
  let currentStep = prevStep;
  const handleClick = (value: number, equal: boolean) =>
    requestAnimationFrame(() => {
      equal ? (step.current = value) : (step.current += value);
      prevStep = currentStep;
      currentStep = calculateCurrentStep(step.current, imgArray.length);
      if (imageWrapperRef.current)
        imageWrapperRef.current.style.transform = `translateX(${-currentStep *
          defaultImgWrapperWidth}px)`;
      stepViewCollectionRef.current?.children[prevStep].classList.remove(
        'selected'
      );
      stepViewCollectionRef.current?.children[currentStep].classList.add(
        'selected'
      );
    });

  useEffect(() => {
    stepViewCollectionRef.current?.children[0].classList.add('selected');
  }, []);

  const sliderContent = (
    <TutorialSliderWrapper showOverlay={showOverlay}>
      <ExitButton
        callBack={callback}
        displayFlag={showOverlay}
        {...styledConfig.exitButton}
      />
      <ImageWrapper showOverlay={showOverlay}>
        <ImageCollectionWrapper ref={imageWrapperRef}>
          <ImagesCollection imgArray={imgArray} />
        </ImageCollectionWrapper>
      </ImageWrapper>
      <DescriptionWrapper>
        <Title content={content[currentStep].title} />
        <Description content={content[currentStep].description} />
        <DecreaseButton onClick={() => handleClick(-1, false)} />
        <IncreaseButton onClick={() => handleClick(1, false)} />
        <StepView ref={stepViewCollectionRef}>
          {imgArray.map((el, id) => (
            <StepViewElement key={el} onClick={() => handleClick(id, true)} />
          ))}
        </StepView>
      </DescriptionWrapper>
    </TutorialSliderWrapper>
  );

  if (!showOverlay) {
    return sliderContent;
  }
  return (
    <Overlay displayFlag={displayFlag} zIndex={ZIndexes.TUTORIAL_SLIDER}>
      {sliderContent}
    </Overlay>
  );
};

interface ITutorialSlider {
  displayFlag: boolean;
  content: IContentCollection[];
  imgArray: string[];
  callback: () => void;
  showOverlay?: boolean;
}

export interface ITitle {
  content: string;
}

interface IContentCollection {
  title: string;
  description: string;
}

interface ITutorialSliderWrapper {
  showOverlay: boolean;
}

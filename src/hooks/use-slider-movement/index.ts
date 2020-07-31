import { RefObject, useEffect } from 'react';

const defaultImgWrapperWidth = 772;
export const useSliderMovement = ({
  step,
  imageWrapperRef,
  currentStep,
  prevStep,
  stepViewCollectionRef,
}: IUseSliderMovement) => {
  useEffect(() => {
    requestAnimationFrame(() => {
      if (imageWrapperRef.current)
        imageWrapperRef.current.style.transform = `translateX(${-currentStep *
          defaultImgWrapperWidth}px)`;
    });
    stepViewCollectionRef.current?.children[prevStep].classList.remove(
      'selected'
    );
    stepViewCollectionRef.current?.children[currentStep].classList.add(
      'selected'
    );
  }, [step]);
};
interface IUseSliderMovement {
  step: number;
  imageWrapperRef: RefObject<HTMLDivElement>;
  currentStep: number;
  prevStep: number;
  stepViewCollectionRef: RefObject<HTMLDivElement>;
}

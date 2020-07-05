import { useEffect } from 'react';
import { MenuItems } from '../../UI/menu-paragraph';

const tutorialSliderTimerDelay = 5000;

export const useDisplayTutorialSlider = ({
  selectedMenuItem,
  isExtraTowerInfoModalOpen,
  DOMLoaded,
  isAuthorized,
  callBack,
}: IUseDisplayTutorialSlider) => {
  let tutorialSliderTimer: number;
  useEffect(() => {
    if (
      !selectedMenuItem &&
      !isExtraTowerInfoModalOpen &&
      DOMLoaded &&
      !isAuthorized
    ) {
      tutorialSliderTimer = setTimeout(() => {
        callBack();
      }, tutorialSliderTimerDelay);
    } else {
      clearTimeout(tutorialSliderTimer);
    }
    return () => clearTimeout(tutorialSliderTimer);
  }, [selectedMenuItem, isExtraTowerInfoModalOpen, DOMLoaded]);
};

interface IUseDisplayTutorialSlider {
  selectedMenuItem: MenuItems | null;
  isExtraTowerInfoModalOpen: boolean;
  DOMLoaded: boolean;
  isAuthorized: boolean;
  callBack: () => void;
}

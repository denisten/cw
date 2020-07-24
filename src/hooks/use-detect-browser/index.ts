import { useEffect } from 'react';
import Bowser from 'bowser';
import { saveBrowserData } from '../../effector/browser/events';

export const useDetectBrowser = () => {
  useEffect(() => {
    const result = Bowser.getParser(navigator.userAgent).getResult();
    saveBrowserData(result.browser.name);
  }, []);
};

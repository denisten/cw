import { useEffect } from 'react';

const delayBetweenDialogMessages = 600;
const delayBetweenLetterAppearing = 12;

export const usePrintDialogMessage = ({
  DOMLoaded,
  setPrintedText,
  setIsPrinting,
  currentMessage,
  dialogStep,
  reload,
}: IUsePrintDialogMessage) => {
  let letterByLetterCallback: number;
  useEffect(() => {
    if (!DOMLoaded) return;
    setPrintedText('');
    clearTimeout(letterByLetterCallback);
    setIsPrinting(true);
    const timeoutBetweenDialogMessages = setTimeout(() => {
      for (let i = 0; i < currentMessage.length; i++) {
        letterByLetterCallback = setTimeout(() => {
          setPrintedText((state: string) => (state += currentMessage[i]));
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
};

interface IUsePrintDialogMessage {
  DOMLoaded: boolean;
  setPrintedText: Function;
  setIsPrinting: Function;
  currentMessage: string;
  dialogStep: number;
  reload?: boolean;
}

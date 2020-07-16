import { symbolRegExp } from '../../constants';
import {
  minSymbolsAlert,
  maxSymbolsAlert,
  haveSymbolsAlert,
} from '../../UI/pop-up';

export const inputValidation = (
  value: string,
  inputHint: string,
  callBack: (arg: boolean) => void,
  errorParams = { maxSymbol: 12, minSymbol: 3 }
) => {
  if (value.length < errorParams.minSymbol) {
    inputHint = minSymbolsAlert + errorParams.minSymbol;
    callBack(true);
  } else if (value.length > errorParams.maxSymbol) {
    inputHint = maxSymbolsAlert + errorParams.maxSymbol;
    callBack(true);
  } else if (value.search(symbolRegExp) > -1) {
    inputHint = haveSymbolsAlert;
    callBack(true);
  } else {
    callBack(false);
    inputHint = '';
  }
  return inputHint;
};

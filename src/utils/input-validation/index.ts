import {
  minSymbolsAlert,
  maxSymbolsAlert,
  haveSymbolsAlert,
} from '../../UI/pop-up';

const symbolRegExp = new RegExp(/[ -!$%^&*()_+|~=`{}\[\]:";'<>?,@#.\/\\]/g);

export const inputValidation = (
  value: string,
  inputHint: string,
  callBack: (arg: boolean) => void,
  errorParams: IErrorParams
) => {
  if (value.length < errorParams.minSymbols) {
    inputHint = minSymbolsAlert + errorParams.minSymbols;
    callBack(true);
  } else if (value.length > errorParams.maxSymbols) {
    inputHint = maxSymbolsAlert + errorParams.maxSymbols;
    callBack(true);
  } else if (errorParams.noSymbols && value.search(symbolRegExp) > -1) {
    inputHint = haveSymbolsAlert;
    callBack(true);
  } else {
    callBack(false);
    inputHint = '';
  }
  return inputHint;
};

export interface IErrorParams {
  maxSymbols: number;
  minSymbols: number;
  noSymbols: boolean;
}

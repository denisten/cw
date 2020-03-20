import { coughtError } from '../../effector/error-boundary-store/events';

export const errorCodes: IErrorCode = {
  404: 'Адрес запроса не найден',
  0: 'Нет соединения с интернетом',
};

export const errorStrings: IErrorStrings = {
  accessdenied: 'Доступ не предоставлен',
};

export const errorCodesParsingHOF = (errorCode: number) => {
  coughtError({
    text: errorCodes[errorCode],
  });
};

export const errorStringsParsingHOF = (errorString: string) => {
  coughtError({
    text: errorStrings[errorString],
  });
};

interface IErrorCode {
  [key: number]: string;
}

interface IErrorStrings {
  [key: string]: string;
}

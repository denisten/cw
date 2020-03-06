import { coughtError } from '../../effector/error-boundary-store/events';

export const errorCodes: IErrorCode = {
  404: 'Адрес запроса не найден',
  0: 'Нет соединения с интернетом',
};

export const errorParsingHOF = (errorCode: number) => {
  coughtError({
    text: errorCodes[errorCode],
  });
};

interface IErrorCode {
  [key: number]: string;
}

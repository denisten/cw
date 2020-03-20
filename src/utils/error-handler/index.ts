import { coughtError } from '../../effector/error-boundary-store/events';

export const errorCodes: IErrorCode = {
  404: 'Адрес запроса не найден',
  0: 'Нет соединения с интернетом',
  1: 'Авторизация отменена пользователем',
};

export const errorParsingHOF = (errorCode: number) => {
  coughtError({
    text: errorCodes[errorCode],
  });
};

interface IErrorCode {
  [key: number]: string;
}

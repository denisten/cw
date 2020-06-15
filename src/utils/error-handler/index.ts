import { coughtError } from '../../effector/error-boundary-store/events';

export const errorCodes: IErrorCode = {
  404: 'Адрес запроса не найден',
  0: 'Нет соединения с интернетом',
  504: 'Нет ответа от сервера',
  401: 'Пользователь не авторизован',
  419: 'Доступно после авторизации',
};

export const errorStrings: IErrorStrings = {
  failure: 'Доступ не предоставлен',
  backendIntegrationError: 'Ошибка интеграции с backend.',
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

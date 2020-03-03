import { ErrorBoundaryDomain } from './domain';

interface IErrorPayload {
  text: string;
}

export const coughtError = ErrorBoundaryDomain.event<IErrorPayload>(
  'dispatching add error '
);

export const resetErrorStore = ErrorBoundaryDomain.event(
  'dispatching clearError '
);

import { ErrorBoundaryDomain } from './domain';

export const coughtError = ErrorBoundaryDomain.event<IErrorPayload>(
  'dispatching add error '
);

export const resetErrorStore = ErrorBoundaryDomain.event(
  'dispatching clearError '
);

interface IErrorPayload {
  text: string;
}

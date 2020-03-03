import { ErrorBoundary } from './domain';

interface IErrorPayload {
  text: string;
}

export const dispatchErrorEvent = ErrorBoundary.event<IErrorPayload>(
  'dispatching add error '
);

export const resetErrorStore = ErrorBoundary.event('dispatching clearError ');

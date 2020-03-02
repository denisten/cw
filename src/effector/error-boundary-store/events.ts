import { ErrorBoundary } from './domain';

interface Event1props {
  text: string;
  errorFlag: boolean;
}

export const dispatchErrorEvent = ErrorBoundary.event<Event1props>(
  'dispatching add error '
);

export const dispatchClearErrorEvent = ErrorBoundary.event(
  'dispatching clearError '
);

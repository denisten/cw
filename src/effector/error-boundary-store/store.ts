import { ErrorBoundary } from './domain';
import { dispatchErrorEvent, dispatchClearErrorEvent } from './events';

interface ErrorStoreProps {
  text: string;
  errorFlag: boolean;
}

const initStore: ErrorStoreProps = {
  text: '',
  errorFlag: false,
};
export const ErrorBoundaryStore = ErrorBoundary.store<ErrorStoreProps>(
  initStore
)
  .on(dispatchErrorEvent, (state, { text, errorFlag }) => {
    return {
      ...state,
      text: text,
      errorFlag: errorFlag,
    };
  })
  .on(dispatchClearErrorEvent, state => {
    return { ...state, errorFlag: false };
  });

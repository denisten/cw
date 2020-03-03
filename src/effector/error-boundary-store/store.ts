import { ErrorBoundary } from './domain';
import { dispatchErrorEvent, resetErrorStore } from './events';

interface IErrorStore {
  text: string;
  errorFlag: boolean;
}

const initStore: IErrorStore = {
  text: '',
  errorFlag: false,
};
export const ErrorBoundaryStore = ErrorBoundary.store<IErrorStore>(initStore)
  .on(dispatchErrorEvent, (state, { text }) => {
    return {
      ...state,
      text,
      errorFlag: true,
    };
  })
  .reset(resetErrorStore);

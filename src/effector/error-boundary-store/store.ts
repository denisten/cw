import { ErrorBoundaryDomain } from './domain';
import { coughtError, resetErrorStore } from './events';

const initStore: IErrorStore = {
  text: '',
  errorFlag: false,
};
export const ErrorBoundaryStore = ErrorBoundaryDomain.store<IErrorStore>(
  initStore
)
  .on(coughtError, (state, { text }) => {
    return {
      ...state,
      text,
      errorFlag: true,
    };
  })
  .reset(resetErrorStore);

interface IErrorStore {
  text: string;
  errorFlag: boolean;
}

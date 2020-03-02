import { TestStoreDomain } from './domain';
import { event1 } from './events';

interface TestStoreProps {
  text: string;
  flag: boolean;
}

const initStore: TestStoreProps = {
  text: '',
  flag: false,
};
export const TestStore = TestStoreDomain.store<TestStoreProps>(initStore).on(
  event1,
  (state, { text, flag }) => {
    return {
      ...state,
      text: text,
      flag: flag,
    };
  }
);

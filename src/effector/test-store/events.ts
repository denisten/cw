import { TestStoreDomain } from './domain';

interface Event1props {
  text: string;
  flag: boolean;
}

export const event1 = TestStoreDomain.event<Event1props>('dispatching event1 ');

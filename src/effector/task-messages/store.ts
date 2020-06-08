import { TaskMessagesDomain } from './domain';

const initStore = {};

export const TaskMessagesStore = TaskMessagesDomain.store(initStore);

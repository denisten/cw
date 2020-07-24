import { BrowserDomain } from './domain';

export const saveBrowserData = BrowserDomain.event<string | undefined>(
  'save detected browser name'
);

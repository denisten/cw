import {AppDomain} from './domain'

export const modalWindowOpen = AppDomain.event('User clicked to view extra info about building');
export const modalWindowClosed = AppDomain.event('User clicked to close extra info about building');
export const toggleModalWindow = AppDomain.event('User toggled modal window');

import { TutorialDomain } from './domain';

export const nextTutorStep = TutorialDomain.event();

export const nextTutorDescriptionStep = TutorialDomain.event();

export const disableTutorialMode = TutorialDomain.event();

export const pauseTutorialMode = TutorialDomain.event();

import { TutorialDomain } from './domain';

export const nextTutorStep = TutorialDomain.event();

export const nextTutorDescriptionStep = TutorialDomain.event();

export const turnOffTutorialMode = TutorialDomain.event();

export const pauseTutorialMode = TutorialDomain.event();

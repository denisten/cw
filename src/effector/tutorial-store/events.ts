import { TutorialDomain } from './domain';
import { TutorialConditions } from './store';

export const nextTutorStep = TutorialDomain.event();

export const nextTutorDescriptionStep = TutorialDomain.event();

export const disableTutorialMode = TutorialDomain.event();

export const pauseTutorialMode = TutorialDomain.event();
export const enableTutorialMode = TutorialDomain.event();
export const setTutorialOnAuthorizedUserFlag = TutorialDomain.event<boolean>();
export const setTutorialCondition = TutorialDomain.event<TutorialConditions>();
export const setSuccessfulTutorial = TutorialDomain.event<boolean>();

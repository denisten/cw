import { TutorialConditions } from '../../effector/tutorial-store/store';
import { openMainTower } from '../../utils/open-main-tower';
import { scrollToMainTower } from '../../utils/scroll-to-main-tower';

export enum TutorialDialogsValues {
  DIALOG_HELLO = 'DIALOG_HELLO',
  DIALOG_CONFIRM_CITY_NAME = 'DIALOG_CONFIRM_CITY_NAME',
  DIALOG_AUTH = 'DIALOG_AUTH',
  DIALOG_START_MISSION = 'DIALOG_START_MISSION',
}

class TutorialDialogTextsService {
  private readonly _tutorialContentData: ITutorialContentData = {
    [TutorialConditions.DIALOG_HELLO]: {
      messages: [
        'Этот мир станет твоим отражением: Что ты любишь, чем пользуешься и к чему стремишься. Впереди тебя ждут интересные миссии, выполняя которые ты построишь персональную вселенную.',
        'Выполняй задания, получай виртуальную валюту и улучшай здания.',
        'Но сначала назови свой мир!',
      ],
      titles: ['Привет!', 'Привет!', 'Городу нужна помощь!'],
      buttonContent: ['Как это работает?', 'Хочу попробовать!', 'Назвать'],
    },
    [TutorialConditions.DIALOG_CONFIRM_CITY_NAME]: {
      messages: [
        ' будет отличным местом! Заходи и делай свой мир лучше каждый день.',
      ],
      titles: ['Класс!'],
      buttonContent: ['Здорово'],
      reload: true,
      action: { step: 0, callBack: scrollToMainTower },
    },
    [TutorialConditions.DIALOG_START_MISSION]: {
      messages: ['Первая миссия – исследуй здание, чтобы улучшить его.'],
      titles: ['За работу…'],
      buttonContent: ['Начать миссию!'],
      action: { step: 0, callBack: openMainTower },
    },

    [TutorialConditions.DIALOG_AUTH]: {
      messages: [
        'Чтобы сохранить твои достижения и приумножить будущие успехи нажми кнопку «Вперед» и следуй дальшейшим инструкциям.',
      ],
      titles: ['Отличная работа!'],
      buttonContent: ['Вперед'],
    },
  };

  getCurrentText(condition: TutorialConditions): IDialogData {
    const content = (condition as unknown) as TutorialDialogsValues;
    return this._tutorialContentData[content];
  }
}
const instance = new TutorialDialogTextsService();
export { instance as TutorialDialogTextsService };

type ITutorialContentData = Record<TutorialDialogsValues, IDialogData>;

export interface IDialogData {
  messages: string[];
  titles: string[];
  buttonContent: string[];
  reload?: boolean;
  action?: { step: number; callBack: () => void };
}

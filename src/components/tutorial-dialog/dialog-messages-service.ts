import { TutorialConditions } from '../../effector/tutorial-store/store';

export enum TutorialDialogsValues {
  DIALOG_HELLO = 'DIALOG_HELLO',
  DIALOG_CONFIRM_CITY_NAME = 'DIALOG_CONFIRM_CITY_NAME',
  DIALOG_AUTH = 'DIALOG_AUTH',
}

class TutorialDialogTextsService {
  private readonly _tutorialContentData: ITutorialContentData = {
    [TutorialConditions.DIALOG_HELLO]: {
      messages: [
        'Этот мир – станет твоим отражением! Тебя ждут интересные миссии, выполняя которые ты построишь персональную вселенную.',
        'Выполняй задания, получай виртуальную валюту и улучшай здания.',
        'Но сначала назови свой мир!',
      ],
      titles: ['Привет!', 'Привет!', 'Привет!'],
      buttonContent: ['Как это работает?', 'Хочу попробовать!', 'Назвать'],
    },
    [TutorialConditions.DIALOG_CONFIRM_CITY_NAME]: {
      messages: [
        ' будет отличным местом! Заходи и делай свой мир лучше каждый день.',
      ],
      titles: ['Класс!'],
      buttonContent: ['Начать миссию!'],
    },
    [TutorialConditions.DIALOG_AUTH]: {
      messages: [
        'Чтобы сохранить твои достижения и приумножить будущие успехи нажми кнопку "Вперед" и следуй дальшейшим инструкциям.',
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
}

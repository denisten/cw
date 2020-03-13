import { TutorialConditions } from '../../effector/tutorial-store/store';
import { modifyTutorialData } from '../../utils/modify-tutorial-data';

export enum TutorialDialogsValues {
  DIALOG_HELLO = 'DIALOG_HELLO',
  DIALOG_CONFIRM_CITY_NAME = 'DIALOG_CONFIRM_CITY_NAME',
  DIALOG_AUTH = 'DIALOG_AUTH',
}

class TutorialDialogTextsService {
  private readonly _tutorialContentData: ITutorialContentData = {
    [TutorialConditions.DIALOG_HELLO]: {
      messages: [
        'Этот мир – твое отражение! Тебя ждут интересные миссии, выполняя которые ты построишь персональную вселенную.',
        'Мир будет прекрасен! Но надо постараться. Впереди еще куча дел. Кстати, за каждое выполненное задание ты получишь валюту. Не забывай ее собирать!',
        'Но сначала назови свой мир!',
      ],
      titles: ['Привет!', 'Привет!', 'Привет!'],
      buttonContent: ['Как это работает?', 'Хочу попробовать!', 'Назвать'],
    },
    [TutorialConditions.DIALOG_CONFIRM_CITY_NAME]: {
      messages: [
        ' будет отличным местом! Но нет предела совершенству. первая миссия - чтобы улучшить здание, исследуй все корпуса.',
      ],
      titles: ['Начать миссию!'],
      buttonContent: ['Начать миссию!'],
    },
    [TutorialConditions.DIALOG_AUTH]: {
      messages: [
        'Чтобы сохранить твои достижения и приумножить будущие успехи нажми кнопку "Вперед" и следуй дальшейшим инструкциям.',
      ],
      titles: ['Начать миссию!'],
      buttonContent: ['Вперед'],
    },
  };

  getCurrentText(condition: TutorialConditions): IDialogData {
    const content = (condition as unknown) as TutorialDialogsValues;
    return modifyTutorialData(this._tutorialContentData[content], condition);
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

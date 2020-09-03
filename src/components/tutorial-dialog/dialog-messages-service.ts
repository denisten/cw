import { TutorialConditions } from '../../effector/tutorial-store/store';
import { openMainTower } from '../../utils/open-main-tower';
import { scrollToMainTower } from '../../utils/scroll-to-main-tower';
import { finishTutorialOnAuthUser } from '../../utils/finish-tutorial-on-auth-user';

export enum TutorialDialogsValues {
  DIALOG_HELLO = 'DIALOG_HELLO',
  DIALOG_CONFIRM_CITY_NAME = 'DIALOG_CONFIRM_CITY_NAME',
  DIALOG_AUTH = 'DIALOG_AUTH',
  DIALOG_START_MISSION = 'DIALOG_START_MISSION',
  FINAL = 'FINAL',
}

class TutorialDialogTextsService {
  private readonly _tutorialContentData: ITutorialContentData = {
    [TutorialConditions.DIALOG_HELLO]: {
      messages: [
        'Это – ваш город в мире МТС. Выполняйте задания, улучшайте город и получайте реальные призы.',
        'Каждое здание в этом городе – воплощение сервисов МТС. С каждой выполненной миссией здания улучшаются, город хорошеет, а вы копите виртуальную валюту.',
        'Валюту можно обменять на реальные призы от МТС: скидки на услуги связи, цифровые сервисы и подарки от партнеров.',
        'Давайте подберем вашему городу подходящее имя.',
      ],
      titles: [
        'Добро пожаловать!',
        'Все просто!',
        'Это бесплатно!',
        'Начнем с главного',
      ],
      buttonContent: [
        'Как это работает?',
        'И что дальше',
        'Звучит интересно',
        'Назвать',
      ],
    },
    [TutorialConditions.DIALOG_CONFIRM_CITY_NAME]: {
      messages: [
        ' станет отличным местом! Городу нужно ваше внимание, так что постарайтесь посещать его ежедневно.',
      ],
      titles: ['Класс!'],
      buttonContent: ['Я постараюсь'],
      reload: true,
      action: { step: 0, callBack: scrollToMainTower },
    },
    [TutorialConditions.DIALOG_START_MISSION]: {
      messages: ['Первая задача - ознакомиться с устройством здания.'],
      titles: ['Приступим!'],
      buttonContent: ['Начать миссию!'],
      action: { step: 0, callBack: openMainTower },
    },

    [TutorialConditions.DIALOG_AUTH]: {
      messages: [
        'Теперь главное – не сбавлять темп. Чтобы не потерять прогресс развития города, просто войдите под номером любого мобильного оператора.',
      ],
      titles: ['Отличная работа!'],
      buttonContent: ['Войти'],
    },
    [TutorialConditions.FINAL]: {
      messages: [
        'Отлично! Обучение пройдено. Можно продолжать пользоваться миром',
      ],
      titles: ['Отличная работа!'],
      buttonContent: ['Играть'],
      action: { step: 0, callBack: finishTutorialOnAuthUser },
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

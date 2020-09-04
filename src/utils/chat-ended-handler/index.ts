import { setMarker } from '../../effector/towers-marker/events';
import { MarkerTypes } from '../../components/markers';
import { Sender } from '../../api/tasks-api/session';
import { pushBotMessageToCurrentChat } from '../../effector/chat/events';
import { TowersTypes } from '../../effector/towers-progress/store';
import { getResult } from '../../effector/tasks-store/events';
import { reactGAEvent } from '../ga-event';
import { BuildingsService } from '../../buildings/config';
import { transliterate } from '../transliterate';

export const chatEndedHandler = async (
  taskId: number,
  towerTitle: TowersTypes
) => {
  const data = await getResult(taskId);
  const { title } = BuildingsService.getConfigForTower(towerTitle);
  if (data.quizResult.success) {
    setMarker({
      towerTitle,
      type: MarkerTypes.SUCCESS,
    });
    const resultObject = {
      message: {
        direction: Sender.BACKEND,
        text: `Молодец! Задание выполнено!
          Правильных ответов ${data.quizResult.correct} из ${data.quizResult
          .correct + data.quizResult.incorrect}.
          В заданиях тебя ждёт награда.`,
      },
      towerTitle,
    };
    pushBotMessageToCurrentChat(resultObject);
  } else {
    const resultObject = {
      message: {
        direction: Sender.BACKEND,
        text: `Увы! Задание не выполнено.
        Правильных ответов ${data.quizResult.correct} из ${data.quizResult
          .correct + data.quizResult.incorrect}. 
        Попробуй еще раз или воспользуйся купоном во вкладке "Задания".`,
      },
      towerTitle,
    };
    pushBotMessageToCurrentChat(resultObject);
  }

  reactGAEvent({
    eventLabel: 'finish',
    eventCategory: 'viktorina',
    eventContent: transliterate(title),
    eventContext: data.quizResult.success ? 'vyigrysh' : 'proigrysh',
  });
};

import { setMarker } from '../../effector/towers-marker/events';
import { TypeOfMarkers } from '../../components/markers';
import { Sender } from '../../api/tasks-api/session';
import { pushBotMessageToCurrentChat } from '../../effector/chat/events';
import { TowersTypes } from '../../effector/towers-progress/store';
import { getResult } from '../../effector/task-store/events';

export const chatEndedHandler = async (
  taskId: number,
  towerTitle: TowersTypes
) => {
  const data = await getResult(taskId);
  if (data.quizResult.success) {
    setMarker({
      towerTitle,
      type: TypeOfMarkers.SUCCESS,
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
};

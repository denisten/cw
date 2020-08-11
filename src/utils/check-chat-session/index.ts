import { TasksType } from '../../components/menu/menu-tasks';
import { TaskStatuses, ITask } from '../../effector/missions-store/store';
import { chatTaskSession } from '../../effector/chat/events';
import { chatEndedHandler } from '../chat-ended-handler';
import { TowersTypes } from '../../effector/towers-progress/store';

export const checkChatSession = async (
  currentTaskIndex: number,
  missions: ITask[],
  taskId: number,
  towerTitle: TowersTypes
) => {
  if (
    currentTaskIndex !== -1 &&
    missions[currentTaskIndex].task.content.taskType.slug !==
      TasksType.COSMETIC &&
    missions[currentTaskIndex].status !== TaskStatuses.DONE &&
    missions[currentTaskIndex].status !== TaskStatuses.CREATED &&
    missions[currentTaskIndex].status !== TaskStatuses.REJECTED
  ) {
    const request = await chatTaskSession({ id: taskId, towerTitle });
    if (request.data.ended) {
      chatEndedHandler(taskId, towerTitle);
    }
  } else if (
    currentTaskIndex !== -1 &&
    missions[currentTaskIndex].task.content.taskType.slug !==
      TasksType.COSMETIC &&
    missions[currentTaskIndex].status === TaskStatuses.REJECTED
  ) {
    const request = await chatTaskSession({
      id: taskId,
      towerTitle,
      retry: false,
    });

    if (request.data.ended) {
      chatEndedHandler(taskId, towerTitle);
    }
  }
};

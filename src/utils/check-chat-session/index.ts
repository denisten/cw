import { chatTaskSession } from '../../effector/chat/events';
import { chatEndedHandler } from '../chat-ended-handler';
import { TowersTypes } from '../../effector/towers-progress/store';
import { ITask, TaskStatuses } from '../../effector/tasks-store/store';
import { TaskTypes } from '../../app';

export const checkChatSession = async (
  task: ITask | null,
  taskId: number,
  towerTitle: TowersTypes
) => {
  if (!task) return;
  if (
    task.taskTypeSlug !== TaskTypes.COSMETIC &&
    task.status !== TaskStatuses.DONE &&
    task.status !== TaskStatuses.CREATED &&
    task.status !== TaskStatuses.REJECTED
  ) {
    const request = await chatTaskSession({ id: taskId, towerTitle });
    if (request.data.ended) {
      chatEndedHandler(taskId, towerTitle);
    }
  } else if (
    task.taskTypeSlug !== TaskTypes.COSMETIC &&
    task.status === TaskStatuses.REJECTED
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

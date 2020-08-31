import { ITask, TaskStatuses } from '../../../effector/tasks-store/store';
import { initChatSession } from '../../../effector/chat/events';
import { timerLoopUpdater } from '../../../utils/timer-closure';
import { saveTask } from '../../../effector/tasks-store/events';

export const tasksHandler = (tasks: ITask[]) => {
  tasks.map(task => {
    if (task.status === TaskStatuses.PROGRESS_COMMITTED) {
      task.status = TaskStatuses.REWARDED;
    }
    if (task.status !== TaskStatuses.CREATED) {
      initChatSession({
        towerTitle: task.productSlug,
        taskId: task.id,
      });
    }
    if (task.expireInSeconds) {
      task.localExpireInSeconds = timerLoopUpdater(task.expireInSeconds);
    }
  });
  saveTask(tasks);
};

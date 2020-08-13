import { ITask } from '../../effector/tasks-store/store';
import { TowersTypes } from '../../effector/towers-progress/store';

export const filterTasksArray = (tasks: ITask[], towerTitle: TowersTypes) =>
  tasks.filter(el => {
    if (el?.task?.content?.product?.slug)
      return el.task.content.product.slug === towerTitle;
  });

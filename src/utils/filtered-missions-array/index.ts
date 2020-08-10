import { ITask } from '../../effector/task-store/store';
import { TowersTypes } from '../../effector/towers-progress/store';

export const filteredMissionsArray = (
  tasks: ITask[],
  towerTitle: TowersTypes
) =>
  tasks.filter(el => {
    if (el?.task?.content?.product?.slug)
      return el.task.content.product.slug === towerTitle;
  });

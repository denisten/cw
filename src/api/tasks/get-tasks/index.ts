import { get } from '../../requests';
import { apiRoutes } from '../../index';
import { ITask } from '../../../effector/missions-store/store';
import { decreaseTimer } from '../../../effector/missions-store/events';
import { setMarker } from '../../../effector/towers-marker/events';
import { TypeOfMarkers } from '../../../components/markers';
import { setTaskId } from '../../../effector/task-messages/events';

let interval = 0;
const second = 1000;

export const getTasks = async () => {
  const response = await get<IGetTasks>(apiRoutes.GET_TASKS);
  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    decreaseTimer();
  }, second);
  response.data.data.userTasks.map(el => {
    setTaskId({ towerTitle: el.task.content.product.slug, taskId: el.id });
    setMarker({
      towerTitle: el.task.content.product.slug,
      type: TypeOfMarkers.TASK,
    });
  });
  return response.data.data;
};

export interface IGetTasks {
  data: {
    userTasks: ITask[];
    total: number;
  };
}

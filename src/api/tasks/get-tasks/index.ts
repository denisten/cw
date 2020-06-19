import { get } from '../../requests';
import { apiRoutes } from '../../index';
import { ITask } from '../../../effector/missions-store/store';
import { decreaseTimer } from '../../../effector/missions-store/events';
import { setMarker } from '../../../effector/towers-marker/events';
import { TypeOfMarkers } from '../../../components/markers';

let interval = 0;
const second = 1000;
export enum TaskStatuses {
  CREATED = 'created',
  ACTIVE = 'active',
  VERIFICATION = 'verification',
  DONE = 'done',
  REJECTED = 'reject',
  REWARDED = 'rewarded',
  EXPIRED = 'expired',
}

export const getTasks = async () => {
  const response = await get<IGetTasks>(apiRoutes.GET_TASKS);
  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    decreaseTimer();
  }, second);
  response.data.data.userTasks.map(el => {
    setMarker({
      towerTitle: el.task.content.product.slug,
      type: TypeOfMarkers.TASK,
    });

    if (el.status === TaskStatuses.DONE) {
      setMarker({
        towerTitle: el.task.content.product.slug,
        type: TypeOfMarkers.SUCCESS,
      });
    }
  });
  return response.data.data;
};

export interface IGetTasks {
  data: {
    userTasks: ITask[];
    total: number;
  };
}

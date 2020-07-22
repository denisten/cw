import { ITask } from '../../../effector/missions-store/store';

export interface IGetTasks {
  data: {
    userTasks: ITask[];
    total: number;
  };
}

import { TASK_STATE } from '@app/constants';

export interface ITask {
  id: string;
  name: string;
  desc: string;
  userId: string | null;
  state: TASK_STATE;
  createdAt: Date;
  updatedAt: Date;
}

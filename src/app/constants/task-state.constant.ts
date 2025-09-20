export enum TASK_STATE {
  IN_PROGRESS = 'IN_PROGRESS',
  IN_QUEUE = 'IN_QUEUE',
  DONE = 'DONE'
}

export const TASK_STATE_MAP = {
  [TASK_STATE.IN_PROGRESS]: 'in-progress',
  [TASK_STATE.IN_QUEUE]: 'in-queue',
  [TASK_STATE.DONE]: 'done'
};

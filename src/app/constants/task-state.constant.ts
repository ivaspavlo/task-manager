export enum TASK_STATE {
  IN_PROCESS = 'IN_PROCESS',
  IN_QUEUE = 'IN_QUEUE',
  DONE = 'DONE'
}

export const TASK_STATE_MAP = {
  [TASK_STATE.IN_PROCESS]: 'in-process',
  [TASK_STATE.IN_QUEUE]: 'in-queue',
  [TASK_STATE.DONE]: 'done'
};

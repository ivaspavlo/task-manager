import { InjectionToken } from '@angular/core';

export enum LOCAL_STORAGE_KEY {
  USERS = 'users',
  TASKS = 'tasks'
}

export const LOCAL_STORAGE = new InjectionToken<Storage>('Local Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

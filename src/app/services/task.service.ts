import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { ITask, ITaskCreate } from '@app/interfaces';
import { LOCAL_STORAGE_KEY, TASK_STATE } from '@app/constants';
import { LocalStoreService } from './local-store.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  #storage: LocalStoreService = inject(LocalStoreService);
  #tasks$!: BehaviorSubject<ITask[]>;
  #tasksKey = LOCAL_STORAGE_KEY.TASKS;

  constructor() {
    this.#tasks$ = new BehaviorSubject(this.#load());
  }

  #load(): ITask[] {
    return this.#storage.get<ITask[]>(this.#tasksKey) ?? [];
  }

  #save(tasks: ITask[]): void {
    this.#storage.set(this.#tasksKey, tasks);
    this.#tasks$.next(tasks);
  }

  public getTasks(): Observable<ITask[]> {
    return this.#tasks$.asObservable();
  }

  public createTask(task: ITaskCreate): void {
    const id = uuidv4();

    const tasks = [
      ...this.#tasks$.value,
      {
        ...task,
        id,
        userId: task.userId || null,
        createdAt: new Date(),
        updatedAt: new Date(),
        state: TASK_STATE.IN_QUEUE
      }
    ];

    this.#save(tasks);
    this.#tasks$.next(tasks);
  }

  public deleteTask(id: string): void {
    const task = this.#tasks$.value.find(t => t.id === id);
    const tasks = this.#tasks$.value.filter(t => t.id !== id);
    this.#save(tasks);
  }

  public deleteTasksOfUser(userId: string): void {
    const tasks = this.#tasks$.value.map(t =>
      t.userId === userId ? { ...t, userId: null, state: TASK_STATE.IN_QUEUE } : t
    );
    this.#save(tasks);
  }

  public updateTask(updates: ITask): void {
    const tasks = this.#tasks$.value.map(task =>
      task.id === updates.id
        ? {
            ...task,
            ...updates,
            updatedAt: new Date()
          }
        : task
    );

    this.#save(tasks);
  }
}

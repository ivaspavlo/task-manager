import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { IUser } from '@app/interfaces';
import { LOCAL_STORAGE_KEY } from '@app/constants';
import { LocalStoreService } from './local-store.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  #storage: LocalStoreService = inject(LocalStoreService);
  #users$!: BehaviorSubject<IUser[]>;
  #usersKey = LOCAL_STORAGE_KEY.USERS;

  constructor() {
    this.#users$ = new BehaviorSubject<IUser[]>(this.#load());
  }

  #load(): IUser[] {
    return this.#storage.get<IUser[]>(this.#usersKey) ?? [];
  }

  #save(users: IUser[]): void {
    this.#storage.set(this.#usersKey, users);
    this.#users$.next(users);
  }

  public getUsers(): Observable<IUser[]> {
    return this.#users$.asObservable();
  }

  public createUser(user: Omit<IUser, 'id' | 'taskIds'>): void {
    const id = uuidv4();
    const users = [
      ...this.#users$.value,
      {
        ...user,
        id,
        taskIds: []
      }
    ];

    this.#save(users);
    this.#users$.next(users);
  }

  public deleteTaskFromUser(userId: string, taskId: string): void {
    const users = this.#users$.value.map(u =>
      u.id === userId ? { ...u, taskIds: u.taskIds.filter(id => id !== taskId) } : u
    );

    this.#save(users);
  }

  public addTaskToUser(userId: string, taskId: string): void {
    const users = this.#users$.value.map(u =>
      u.id === userId && !u.taskIds.includes(taskId) ? { ...u, taskIds: [...u.taskIds, taskId] } : u
    );

    this.#save(users);
  }

  public deleteUser(userId: string): void {
    const users = this.#users$.value.filter(u => u.id !== userId);
    this.#save(users);
  }
}

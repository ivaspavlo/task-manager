import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { take } from 'rxjs';

import { TASK_STATE } from '@app/constants';
import { ITaskCreate } from '@app/interfaces';
import { MockLocalStoreService } from '../../../tests';
import { TaskService } from './task.service';
import { LocalStoreService } from './local-store.service';

describe('TaskService', () => {
  let service: TaskService;
  let storage: MockLocalStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService, { provide: LocalStoreService, useClass: MockLocalStoreService }]
    });

    service = TestBed.inject(TaskService);
    storage = TestBed.inject(LocalStoreService) as unknown as MockLocalStoreService;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createTask', () => {
    it('should add a new task with required defaults', done => {
      const taskInput: ITaskCreate = { name: 'Test Task', desc: 'desc' };

      service.createTask(taskInput);

      service
        .getTasks()
        .pipe(take(1))
        .subscribe(tasks => {
          const task = tasks[0];

          expect(tasks.length).toBe(1);
          expect(task.name).toBe('Test Task');
          expect(task.desc).toBe('desc');
          expect(task.id).toBeTruthy();
          expect(task.userId).toBeNull();
          expect(task.state).toBe(TASK_STATE.IN_QUEUE);
          expect(task.createdAt).toBeTruthy();
          expect(task.updatedAt).toBeTruthy();
          done();
        });
    });
  });

  describe('deleteTask', () => {
    it('should remove a task by id', done => {
      service.createTask({ name: 'Task #1' } as any);
      service.createTask({ name: 'Task #2' } as any);

      service
        .getTasks()
        .pipe(take(1))
        .subscribe(before => {
          const idToDelete = before[0].id;
          service.deleteTask(idToDelete);

          service
            .getTasks()
            .pipe(take(1))
            .subscribe(tasks => {
              expect(tasks.find(t => t.id === idToDelete)).toBeUndefined();
              expect(tasks.length).toBe(1);
              done();
            });
        });
    });
  });

  describe('deleteTasksOfUser', () => {
    it('should unassign all tasks of a user and reset state', done => {
      service.createTask({ name: 'Task #1', userId: 'u1' } as any);
      service.createTask({ name: 'Task #2', userId: 'u1' } as any);
      service.createTask({ name: 'Task #3', userId: 'u2' } as any);

      service.deleteTasksOfUser('u1');

      service
        .getTasks()
        .pipe(take(1))
        .subscribe(tasks => {
          const user1Tasks = tasks.filter(t => t.userId === null);
          const user2Tasks = tasks.filter(t => t.userId === 'u2');

          expect(user1Tasks.every(t => t.state === TASK_STATE.IN_QUEUE)).toBeTrue();
          expect(user1Tasks.length).toBe(2);
          expect(user2Tasks.length).toBe(1);
          done();
        });
    });
  });

  it('should update an existing task and set updatedAt', fakeAsync(() => {
    service.createTask({ title: 'Task #1' } as any);

    let before: any;
    service
      .getTasks()
      .pipe(take(1))
      .subscribe(tasks => (before = tasks));

    const oldUpdatedAt = before[0].updatedAt;

    tick(1);

    service.updateTask({ ...before[0], title: 'Task Updated' });

    let result: any;
    service
      .getTasks()
      .pipe(take(1))
      .subscribe(tasks => (result = tasks));

    expect(result[0].title).toBe('Task Updated');
    expect(new Date(result[0].updatedAt).getTime()).toBeGreaterThan(
      new Date(oldUpdatedAt).getTime()
    );
  }));
});

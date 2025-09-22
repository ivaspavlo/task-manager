import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs';

import { IUserUpdate } from '@app/interfaces';
import { MockLocalStoreService } from '../../../tests';
import { UserService } from './user.service';
import { LocalStoreService } from './local-store.service';

describe('UserService', () => {
  let service: UserService;
  let storage: MockLocalStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService, { provide: LocalStoreService, useClass: MockLocalStoreService }]
    });

    service = TestBed.inject(UserService);
    storage = TestBed.inject(LocalStoreService) as unknown as MockLocalStoreService;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createUser', () => {
    it('should add a new user with id and empty taskIds', done => {
      service.createUser({ name: 'Test User' } as any);

      service
        .getUsers()
        .pipe(take(1))
        .subscribe(users => {
          expect(users.length).toBe(1);
          expect(users[0].name).toBe('Test User');
          expect(users[0].id).toBeTruthy();
          expect(users[0].taskIds).toEqual([]);
          done();
        });
    });
  });

  describe('deleteUser', () => {
    it('should remove a user by id', done => {
      service.createUser({ name: 'Test User #1' } as any);
      service.createUser({ name: 'Test User #2' } as any);

      service
        .getUsers()
        .pipe(take(1))
        .subscribe(usersBefore => {
          const idToDelete = usersBefore[0].id;
          service.deleteUser(idToDelete);

          service
            .getUsers()
            .pipe(take(1))
            .subscribe(usersAfter => {
              expect(usersAfter.find(u => u.id === idToDelete)).toBeUndefined();
              expect(usersAfter.length).toBe(1);
              done();
            });
        });
    });
  });

  describe('addTaskToUser', () => {
    it('should add a taskId if not already present', done => {
      service.createUser({ name: 'Test User' } as any);

      service
        .getUsers()
        .pipe(take(1))
        .subscribe(usersBefore => {
          const userId = usersBefore[0].id;

          service.addTaskToUser(userId, 'Task #1');

          service
            .getUsers()
            .pipe(take(1))
            .subscribe(usersAfter => {
              expect(usersAfter[0].taskIds).toContain('Task #1');
              done();
            });
        });
    });
  });

  describe('deleteTaskFromUser', () => {
    it('should remove a taskId from user', done => {
      service.createUser({ name: 'Test User #1' } as any);

      service
        .getUsers()
        .pipe(take(1))
        .subscribe(usersBefore => {
          const userId = usersBefore[0].id;

          service.addTaskToUser(userId, 'Task #1');
          service.deleteTaskFromUser(userId, 'Task #1');

          service
            .getUsers()
            .pipe(take(1))
            .subscribe(usersAfter => {
              expect(usersAfter[0].taskIds).not.toContain('Task #1');
              done();
            });
        });
    });
  });

  describe('updateUser', () => {
    it('should update a user with new values', done => {
      service.createUser({ name: 'Test User' } as any);

      service
        .getUsers()
        .pipe(take(1))
        .subscribe(usersBefore => {
          const userId = usersBefore[0].id;
          const update: IUserUpdate = { id: userId, name: 'Test User updated' };

          service.updateUser(update);

          service
            .getUsers()
            .pipe(take(1))
            .subscribe(usersAfter => {
              expect(usersAfter[0].name).toBe('Test User updated');
              done();
            });
        });
    });
  });
});

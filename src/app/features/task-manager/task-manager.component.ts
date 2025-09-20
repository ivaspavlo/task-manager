import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NbCardModule, NbTabsetModule } from '@nebular/theme';
import { Observable } from 'rxjs';

import { ITask, IUser } from '@app/interfaces';
import { TaskService, UserService } from '@app/services';
import { TaskListComponent } from './components/task-list/task-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { TabTitlePipe } from './pipes/tab-title.pipe';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [
    AsyncPipe,
    NbCardModule,
    NbTabsetModule,
    TaskListComponent,
    UserListComponent,
    TabTitlePipe
  ],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskManagerComponent implements OnInit {
  #taskService: TaskService = inject(TaskService);
  #userService: UserService = inject(UserService);

  protected tasks$: Observable<ITask[]> = this.#taskService.getTasks();
  protected users$: Observable<IUser[]> = this.#userService.getUsers();

  ngOnInit(): void {}
}

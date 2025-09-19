import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { NbCardModule, NbTabsetModule } from '@nebular/theme';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { TaskListComponent } from './components/task-list/task-list.component';
import { UserListComponent } from './components/user-list/user-list.component';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [NbCardModule, NbTabsetModule, TaskListComponent, UserListComponent],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskManagerComponent implements OnInit {
  #translate: TranslateService = inject(TranslateService);

  protected get tasksTabTitle() {
    return `${this.#translate.instant('tasks')} (${this.#tasksQty})`;
  }

  protected get usersTabTitle() {
    return `${this.#translate.instant('users')} (${this.#usersQty})`;
  }

  #tasksQty: number = 1;
  #usersQty: number = 1;

  ngOnInit(): void {}
}

import { ChangeDetectionStrategy, Component, inject, TemplateRef } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbDialogService,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbTagModule,
  NbToastrService
} from '@nebular/theme';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { TaskService, UserService } from '@app/services';
import { TaskCardComponent } from '../task-card/task-card.component';

import { ITask, IUser } from '@app/interfaces';

interface ICreateTaskUser {
  name: string;
  id: string;
}

interface ICreateTaskForm {
  name: FormControl<string | null>;
  desc: FormControl<string | null>;
  userId: FormControl<ICreateTaskUser | null>;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    NbCardModule,
    NbButtonModule,
    NbTagModule,
    NbIconModule,
    NbInputModule,
    NbDialogModule,
    NbSelectModule,
    TranslatePipe,
    TaskCardComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {
  #fb: FormBuilder = inject(FormBuilder);
  #dialogService: NbDialogService = inject(NbDialogService);
  #toastrService: NbToastrService = inject(NbToastrService);
  #translateService: TranslateService = inject(TranslateService);

  #taskService: TaskService = inject(TaskService);
  #userService: UserService = inject(UserService);

  protected tasks$: Observable<ITask[]> = this.#taskService.getTasks();
  protected users$: Observable<IUser[]> = this.#userService.getUsers();

  protected createTaskForm: FormGroup<ICreateTaskForm> = this.#fb.group({
    name: this.#fb.control<string | null>(null, [Validators.required, Validators.minLength(3)]),
    desc: this.#fb.control<string | null>(null, [Validators.required, Validators.minLength(10)]),
    userId: this.#fb.control<ICreateTaskUser | null>(null)
  });

  protected onCreateTask(dialog: TemplateRef<unknown>): void {
    this.#dialogService
      .open(dialog)
      .onClose.pipe()
      .subscribe((value: any | null | undefined) => {
        if (!value) {
          this.createTaskForm.reset();
          return;
        }

        this.#taskService.createTask(value);

        this.createTaskForm.reset();

        this.#toastrService.success(
          this.#translateService.instant('success'),
          this.#translateService.instant('toasts.task-created')
        );
      });
  }

  protected onDeleteTask(task: ITask, dialog: TemplateRef<unknown>): void {
    console.log(task);

    this.#dialogService
      .open(dialog)
      .onClose.pipe()
      .subscribe((value: boolean | undefined) => {
        if (!value) {
          return;
        }

        this.#taskService.deleteTask(task.id);
        if (task?.userId) {
          this.#userService.deleteTaskFromUser(task.userId, task.id);
        }

        this.#toastrService.info(
          this.#translateService.instant('success'),
          this.#translateService.instant('toasts.task-deleted')
        );
      });
  }
}

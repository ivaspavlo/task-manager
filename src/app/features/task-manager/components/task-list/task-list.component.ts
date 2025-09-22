import { ChangeDetectionStrategy, Component, DestroyRef, inject, TemplateRef } from '@angular/core';
import { AsyncPipe, KeyValuePipe } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { first, Observable } from 'rxjs';
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

import { ITask, ITaskCreate, IUser } from '@app/interfaces';
import { TASK_STATE, TASK_STATE_MAP } from '@app/constants';
import { TaskService, UserService } from '@app/services';
import { TaskCardComponent } from '../task-card/task-card.component';

interface ITaskForm {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  desc: FormControl<string | null>;
  userId: FormControl<string | null>;
  state: FormControl<string | null>;
  createdAt: FormControl<Date | null>;
  updatedAt: FormControl<Date | null>;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    KeyValuePipe,
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
  #destroyRef: DestroyRef = inject(DestroyRef);
  #fb: FormBuilder = inject(FormBuilder);
  #dialogService: NbDialogService = inject(NbDialogService);
  #toastrService: NbToastrService = inject(NbToastrService);
  #translateService: TranslateService = inject(TranslateService);

  #taskService: TaskService = inject(TaskService);
  #userService: UserService = inject(UserService);

  protected tasks$: Observable<ITask[]> = this.#taskService.getTasks();
  protected users$: Observable<IUser[]> = this.#userService.getUsers();
  protected isEditMode = false;
  protected taskStateMap = TASK_STATE_MAP;

  protected taskForm: FormGroup<ITaskForm> = this.#fb.group({
    id: this.#fb.control<string | null>(null),
    name: this.#fb.control<string | null>(null, [Validators.required, Validators.minLength(3)]),
    desc: this.#fb.control<string | null>(null, [Validators.required, Validators.minLength(10)]),
    userId: this.#fb.control<string | null>(null),
    createdAt: this.#fb.control<Date | null>(null),
    updatedAt: this.#fb.control<Date | null>(null),
    state: this.#fb.control<string | null>(null)
  });

  #listenToSelectUserEvent(): void {
    this.taskForm.controls.userId.valueChanges
      .pipe(first(), takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        this.taskForm.controls.state.enable();
      });
  }

  protected onCreateTask(dialog: TemplateRef<unknown>): void {
    this.#dialogService
      .open(dialog)
      .onClose.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((value: ITaskCreate | null | undefined) => {
        if (!value) {
          this.taskForm.reset();
          return;
        }

        this.#taskService.createTask(value);

        this.taskForm.reset();

        this.#toastrService.success(
          this.#translateService.instant('success'),
          this.#translateService.instant('toasts.task-created')
        );
      });
  }

  protected onDeleteTask(task: ITask, dialog: TemplateRef<unknown>): void {
    this.#dialogService
      .open(dialog)
      .onClose.pipe(takeUntilDestroyed(this.#destroyRef))
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

  protected onEditTask(task: ITask, tasks: ITask[], dialog: TemplateRef<unknown>): void {
    this.isEditMode = true;

    const prevUserId = task.userId;

    this.taskForm.patchValue({
      id: task.id || null,
      userId: task.userId || null,
      name: task.name,
      desc: task.desc,
      state: task.state,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    });

    if (!task.state) {
      this.taskForm.controls.state.patchValue(TASK_STATE.IN_QUEUE);
    }

    if (!task.userId) {
      this.taskForm.controls.state.disable();
      this.#listenToSelectUserEvent();
    }

    this.#dialogService
      .open(dialog)
      .onClose.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((value: ITask | null | undefined) => {
        if (!value) {
          this.isEditMode = false;
          this.taskForm.reset();
          return;
        }

        const currUserId = value.userId;
        const userIsBusy = tasks.some(
          t => t.userId === currUserId && t.state === TASK_STATE.IN_PROGRESS
        );

        if (userIsBusy && value.state === TASK_STATE.IN_PROGRESS) {
          this.#toastrService.danger(
            this.#translateService.instant('Error'),
            this.#translateService.instant('toasts.user-is-busy')
          );

          this.isEditMode = false;
          this.taskForm.reset();
          return;
        }

        if (prevUserId && prevUserId !== currUserId) {
          this.#userService.deleteTaskFromUser(prevUserId, task.id);
        }

        if (currUserId && currUserId !== prevUserId) {
          this.#userService.addTaskToUser(currUserId, task.id);
        }

        this.#taskService.updateTask(value);

        this.#toastrService.success(
          this.#translateService.instant('success'),
          this.#translateService.instant('toasts.task-updated')
        );

        this.taskForm.reset();
        this.isEditMode = false;
      });
  }
}

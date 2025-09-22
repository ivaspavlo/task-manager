import { ChangeDetectionStrategy, Component, DestroyRef, inject, TemplateRef } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogService,
  NbIconModule,
  NbInputModule,
  NbTagModule,
  NbToastrService
} from '@nebular/theme';
import { Observable } from 'rxjs';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { ITask, IUser, IUserUpdate } from '@app/interfaces';
import { TaskService, UserService } from '@app/services';
import { UserCardComponent } from '../user-card/user-card.component';
import { TasksForUserPipe } from '../../pipes/tasks-for-user.pipe';

interface IUserForm {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    NbCardModule,
    NbButtonModule,
    NbTagModule,
    NbIconModule,
    NbInputModule,
    TranslatePipe,
    UserCardComponent,
    TasksForUserPipe
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
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

  protected userForm: FormGroup<IUserForm> = this.#fb.group({
    id: this.#fb.control<string | null>(null),
    name: this.#fb.control<string | null>(null, [Validators.required, Validators.minLength(3)])
  });

  protected onCreateUser(dialog: TemplateRef<unknown>): void {
    this.#dialogService
      .open(dialog)
      .onClose.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((value: IUser | null | undefined) => {
        if (!value) {
          this.userForm.reset();
          return;
        }

        this.#userService.createUser(value);

        this.#toastrService.success(
          this.#translateService.instant('success'),
          this.#translateService.instant('toasts.user-created')
        );
      });
  }

  protected onDeleteUser(user: IUser, dialog: TemplateRef<unknown>): void {
    this.#dialogService
      .open(dialog)
      .onClose.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((value: boolean | undefined) => {
        if (!value) {
          return;
        }

        this.#userService.deleteUser(user.id);
        this.#taskService.deleteTasksOfUser(user.id);

        this.#toastrService.success(
          this.#translateService.instant('success'),
          this.#translateService.instant('toasts.user-deleted')
        );
      });
  }

  protected onEditUser(value: IUser, dialog: TemplateRef<unknown>): void {
    this.isEditMode = true;

    this.userForm.patchValue({
      id: value.id,
      name: value.name
    });

    this.#dialogService
      .open(dialog)
      .onClose.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((value: IUserUpdate | null | undefined) => {
        if (!value) {
          return;
        }

        this.#userService.updateUser(value);

        this.userForm.reset();
        this.isEditMode = false;
      });
  }
}

import { ChangeDetectionStrategy, Component, inject, TemplateRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbDialogService,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbTagModule
} from '@nebular/theme';
import { TranslatePipe } from '@ngx-translate/core';

import { TaskCardComponent } from '../task-card/task-card.component';
import { AsyncPipe, JsonPipe } from '@angular/common';

interface ICreateTaskUser {
  name: string;
  id: string;
}

interface ICreateTaskForm {
  name: FormControl<string | null>;
  desc: FormControl<string | null>;
  user: FormControl<ICreateTaskUser | null>;
}

interface ICreateTaskFormValue {
  name: string | null;
  desc: string | null;
  user: ICreateTaskUser | null;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
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

  protected users: ICreateTaskUser[] = [{ name: 'Test User #1', id: '1' }];

  protected createTaskForm: FormGroup<ICreateTaskForm> = this.#fb.group({
    name: this.#fb.control<string | null>(null, [Validators.required, Validators.minLength(3)]),
    desc: this.#fb.control<string | null>(null, [Validators.required, Validators.minLength(10)]),
    user: this.#fb.control<ICreateTaskUser | null>(null, [Validators.required])
  });

  protected onCreateTask(dialog: TemplateRef<unknown>): void {
    this.#dialogService
      .open(dialog, { context: 'test' })
      .onClose.pipe()
      .subscribe((value: ICreateTaskFormValue | null | undefined) => {
        if (!value) {
          this.createTaskForm.reset();
          return;
        }

        console.log(this.createTaskForm.value);
      });
  }

  protected onDeleteTask(task: any, dialog: TemplateRef<unknown>): void {
    console.log(task);

    this.#dialogService
      .open(dialog)
      .onClose.pipe()
      .subscribe((value: boolean | undefined) => {
        if (!value) {
          return;
        }
      });
  }
}

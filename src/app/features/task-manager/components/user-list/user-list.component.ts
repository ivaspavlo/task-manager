import { ChangeDetectionStrategy, Component, inject, TemplateRef } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogService,
  NbIconModule,
  NbInputModule,
  NbTagModule
} from '@nebular/theme';
import { TranslatePipe } from '@ngx-translate/core';

import { UserCardComponent } from '../user-card/user-card.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

interface ICreateUserForm {
  name: FormControl<string | null>;
}

interface ICreateUserFormValue {
  name: string | null;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NbCardModule,
    NbButtonModule,
    NbTagModule,
    NbIconModule,
    NbInputModule,
    TranslatePipe,
    UserCardComponent
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  #fb: FormBuilder = inject(FormBuilder);
  #dialogService: NbDialogService = inject(NbDialogService);

  protected createUserForm: FormGroup<ICreateUserForm> = this.#fb.group({
    name: this.#fb.control<string | null>(null, [Validators.required, Validators.minLength(3)])
  });

  protected onCreateUser(dialog: TemplateRef<unknown>): void {
    this.#dialogService
      .open(dialog)
      .onClose.pipe()
      .subscribe((value: ICreateUserFormValue | null | undefined) => {
        if (!value) {
          this.createUserForm.reset();
          return;
        }

        console.log(this.createUserForm.value);
      });
  }

  protected onDeleteUser(user: any, dialog: TemplateRef<unknown>): void {
    console.log(user);

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

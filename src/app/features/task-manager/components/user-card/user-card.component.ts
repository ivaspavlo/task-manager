import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask, IUser } from '@app/interfaces';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbListModule,
  NbTagModule
} from '@nebular/theme';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [NbCardModule, NbButtonModule, NbTagModule, NbIconModule, NbListModule, TranslatePipe],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  @Input({ required: true }) user!: IUser;
  @Input({ required: true }) tasks: ITask[] = [];

  @Output() delete: EventEmitter<IUser> = new EventEmitter();
  @Output() edit: EventEmitter<IUser> = new EventEmitter();
}

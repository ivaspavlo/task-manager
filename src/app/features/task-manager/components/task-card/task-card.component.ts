import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule, NbTagModule } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

import { ITask, IUser } from '@app/interfaces';
import { TASK_STATE, TASK_STATE_MAP } from '@app/constants';
import { TaskStatusComponent } from '../task-status/task-status.component';
import { UserForTaskPipe } from '../../pipes/user-for-task.pipe';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    DatePipe,
    NbCardModule,
    NbButtonModule,
    NbTagModule,
    NbIconModule,
    TranslatePipe,
    TaskStatusComponent,
    UserForTaskPipe
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCardComponent {
  @Input({ required: true }) task!: ITask;
  @Input({ required: true }) users: IUser[] | null = [];

  @Output() delete = new EventEmitter<ITask>();
  @Output() edit = new EventEmitter<ITask>();

  protected taskState = TASK_STATE;
  protected taskStateMap = TASK_STATE_MAP;
}

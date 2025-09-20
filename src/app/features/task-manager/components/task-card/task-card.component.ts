import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule, NbTagModule } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

import { ITask } from '@app/interfaces';
import { TASK_STATE, TASK_STATE_MAP } from '@app/constants';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [NbCardModule, NbButtonModule, NbTagModule, NbIconModule, TranslatePipe, DatePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCardComponent {
  @Input({ required: true }) task!: ITask;

  @Output() delete: EventEmitter<ITask> = new EventEmitter();
  @Output() edit: EventEmitter<ITask> = new EventEmitter();

  protected taskState = TASK_STATE;
  protected taskStateMap = TASK_STATE_MAP;
}

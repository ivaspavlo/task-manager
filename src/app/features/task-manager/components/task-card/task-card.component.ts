import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule, NbTagModule } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ITask } from '@app/interfaces';
import { TASK_STATE_MAP } from '@app/constants';

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
  @Output() delete: EventEmitter<any> = new EventEmitter();

  protected taskStateMap = TASK_STATE_MAP;

  protected onCardDeleteClick(): void {
    this.delete.emit(this.task);
  }
}

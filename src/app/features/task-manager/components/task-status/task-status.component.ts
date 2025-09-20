import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NbTagModule } from '@nebular/theme';
import { TranslatePipe } from '@ngx-translate/core';
import { TASK_STATE, TASK_STATE_MAP } from '@app/constants';

@Component({
  selector: 'app-task-status',
  standalone: true,
  imports: [NbTagModule, TranslatePipe],
  templateUrl: './task-status.component.html',
  styleUrl: './task-status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskStatusComponent {
  @Input({ required: true }) state!: TASK_STATE;

  protected taskState = TASK_STATE;
  protected taskStateMap = TASK_STATE_MAP;
}

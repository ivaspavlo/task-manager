import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule, NbTagModule } from '@nebular/theme';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [NbCardModule, NbButtonModule, NbTagModule, NbIconModule, TranslatePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCardComponent {
  @Input() task: any = true;
  @Output() delete: EventEmitter<any> = new EventEmitter();

  protected onCardDeleteClick(): void {
    this.delete.emit(this.task);
  }
}

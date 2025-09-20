import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() user: any = true;
  @Output() delete: EventEmitter<any> = new EventEmitter();

  protected onUserDeleteClick(): void {
    this.delete.emit(this.user);
  }
}

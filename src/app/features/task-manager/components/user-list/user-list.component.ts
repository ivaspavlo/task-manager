import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule, NbTagModule } from '@nebular/theme';
import { TranslatePipe } from '@ngx-translate/core';

import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    NbCardModule,
    NbButtonModule,
    NbTagModule,
    NbIconModule,
    TranslatePipe,
    UserCardComponent
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {}

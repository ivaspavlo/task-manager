import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '@app/interfaces';

@Pipe({
  name: 'userForTask',
  standalone: true
})
export class UserForTaskPipe implements PipeTransform {
  transform(userId: string, users: IUser[] | null): string {
    if (!userId || !users) {
      return '';
    }
    return users.find(u => u.id === userId)?.name || '';
  }
}

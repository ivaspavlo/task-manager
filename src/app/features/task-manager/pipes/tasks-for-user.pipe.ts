import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from '@app/interfaces';

@Pipe({
  name: 'tasksForUser',
  standalone: true
})
export class TasksForUserPipe implements PipeTransform {
  transform(tasks: ITask[] | null, userId: string | null): ITask[] {
    if (!tasks || !userId) {
      return [];
    }
    return tasks.filter(t => t.userId === userId) || [];
  }
}

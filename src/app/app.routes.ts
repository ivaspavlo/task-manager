import { Routes } from '@angular/router';

enum ROUTE_NAMES {
  WELCOME = 'welcome',
  TASK_MANAGER = 'task-manager',
  TASK_LIST = 'task-list',
  USER_LIST = 'user-list'
}

export const ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: ROUTE_NAMES.WELCOME
      },
      {
        path: ROUTE_NAMES.WELCOME,
        loadComponent: () =>
          import('./features/welcome-page/welcome-page.component').then(c => c.WelcomePageComponent)
      },
      {
        path: ROUTE_NAMES.TASK_MANAGER,
        loadComponent: () =>
          import('./features/task-manager/task-manager.component').then(c => c.TaskManagerComponent)
      }
    ]
  }
];

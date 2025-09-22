# Tasks Manager Application

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.3.

## Application link

https://task-manager-9fbab.firebaseapp.com/

## Project structure

- `constants` folder - contains enums, injection tokens and other one-of-a-kind data;
- `interfaces` folder - contains global interfaces;
- `services` folder - contains global services: TaskService, UserService and LocalStorageService;
- `features` folder - contains actual pages of the application: Welcome and Task Manager. All the underlying components for Task Manager are contained within it's folder.

## Project functionality

### Basic

- Tasks CRUD.
- Task minimal data structure: name / description / create date / update date / state ('in queue' | 'in progress' | 'done').
- Users CRUD.
- User minimal data structure: name.
- Tasks can be assigned to users.
- Task can be assigned to one user only.
- Task which is not assigned to any user can take 'in queue' state only.
- The same user cannot be assigned to more than one task which is ‘in progress’.
- Listing the tasks displayed data: task name, create and update date, assigned users and task states.
- Listing the users displayed data: user name and assigned tasks.
- Data storing is done in browser's storage.

### Additional

- I18n feature: English and German languages are supported.
- Displayed the total quantity of task and users.
- Forms validation and error handling;
- Notification messages after performing actions;
- Code linting and automatic formatting setup.
- Unit tests cover the main services.
- Deployment setup.

### Tech stack

- Angular 17
- Nebular UI
- Bootstrap 5
- Firebase Hosting
- ngx-translate
- uuid
- eslint
- prettier

## Commands

- `ng serve` - for a dev server.
- `ng build` - to build the project.
- `ng test` - to execute the unit tests.
- `firebase deploy` - to deploy the application to Firebase hosting.

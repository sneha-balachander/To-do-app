import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./home/home').then(m => m.Home)
    },
    {
        path: 'to-dos',
        loadComponent: () => import('./todos/todos').then(m => m.Todos),
        title: 'To-Do List',
    },
];


import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResourceListComponent, ResourceComponent } from './resources';

const appRoutes: Routes = [
  {
    path: 'resources',
    component: ResourceListComponent
  },
  {
    path: 'add-resource',
    component: ResourceComponent
  },
  {
    path: '',
    redirectTo: '/resources',
    pathMatch: 'full'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Configurações'
    },
    children: [
      {
        path: '',
        redirectTo: 'account'
      },
      {
        path: 'account',
        component: SettingsComponent,
        data: {
          title: 'Conta'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}

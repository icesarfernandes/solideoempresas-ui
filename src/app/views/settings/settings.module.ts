// Angular
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';

import { SettingsComponent } from './settings.component';
// Components Routing
import { SettingsRoutingModule } from './settings-routing.module';
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SettingsRoutingModule,
    ModalModule,
    ReactiveFormsModule,
    BsDropdownModule
  ],
  declarations: [
    SettingsComponent
  ]
})
export class SettingsModule { }

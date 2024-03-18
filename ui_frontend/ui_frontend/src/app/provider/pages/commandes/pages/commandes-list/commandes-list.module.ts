import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandesListRoutingModule } from './commandes-list-routing.module';
import { CommandesListComponent } from './commandes-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CommandesListComponent
  ],
  imports: [
    CommonModule,
    CommandesListRoutingModule,
    SharedModule
  ]
})
export class CommandesListModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandesDetailsRoutingModule } from './commandes-details-routing.module';
import { CommandesDetailsComponent } from './commandes-details.component';


@NgModule({
  declarations: [
    CommandesDetailsComponent
  ],
  imports: [
    CommonModule,
    CommandesDetailsRoutingModule
  ]
})
export class CommandesDetailsModule { }

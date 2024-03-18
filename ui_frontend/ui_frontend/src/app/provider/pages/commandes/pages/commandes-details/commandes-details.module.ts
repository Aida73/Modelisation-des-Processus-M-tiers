import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandesDetailsRoutingModule } from './commandes-details-routing.module';
import { CommandesDetailsComponent } from './commandes-details.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CommandesDetailsComponent
  ],
  imports: [
    CommonModule,
    CommandesDetailsRoutingModule,
    SharedModule
  ]
})
export class CommandesDetailsModule { }

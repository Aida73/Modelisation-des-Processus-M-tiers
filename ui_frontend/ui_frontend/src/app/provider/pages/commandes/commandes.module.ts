import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandesRoutingModule } from './commandes-routing.module';
import { CommandesComponent } from './commandes.component';


@NgModule({
  declarations: [
    CommandesComponent
  ],
  imports: [
    CommonModule,
    CommandesRoutingModule
  ]
})
export class CommandesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandesDetailRoutingModule } from './commandes-detail-routing.module';
import { CommandesDetailComponent } from './commandes-detail.component';


@NgModule({
  declarations: [
    CommandesDetailComponent
  ],
  imports: [
    CommonModule,
    CommandesDetailRoutingModule
  ]
})
export class CommandesDetailModule { }

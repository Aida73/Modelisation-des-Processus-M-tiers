import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevisRoutingModule } from './devis-routing.module';
import { DevisComponent } from './devis.component';


@NgModule({
  declarations: [
    DevisComponent
  ],
  imports: [
    CommonModule,
    DevisRoutingModule
  ]
})
export class DevisModule { }

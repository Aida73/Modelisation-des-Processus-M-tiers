import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevisDetailsRoutingModule } from './devis-details-routing.module';
import { DevisDetailsComponent } from './devis-details.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DevisDetailsComponent
  ],
  imports: [
    CommonModule,
    DevisDetailsRoutingModule,
    SharedModule
  ]
})
export class DevisDetailsModule { }

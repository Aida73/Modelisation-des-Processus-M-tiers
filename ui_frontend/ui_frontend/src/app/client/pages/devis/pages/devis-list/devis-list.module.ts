import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevisListRoutingModule } from './devis-list-routing.module';
import { DevisListComponent } from './devis-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DevisListComponent
  ],
  imports: [
    CommonModule,
    DevisListRoutingModule,
    SharedModule
  ]
})
export class DevisListModule { }

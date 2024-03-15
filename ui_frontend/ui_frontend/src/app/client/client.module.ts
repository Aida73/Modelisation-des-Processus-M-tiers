import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ProviderModule } from '../provider/provider.module';
import { SidebarComponent } from '../provider/components/sidebar/sidebar.component';


@NgModule({
  declarations: [
    ClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ProviderModule
  ]
})
export class ClientModule { }

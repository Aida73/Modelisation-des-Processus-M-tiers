import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderRoutingModule } from './provider-routing.module';
import { ProviderComponent } from './provider.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    ProviderComponent,
    SidebarComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ProviderRoutingModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class ProviderModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevisComponent } from './devis.component';

const routes: Routes = [
  { path: '', component: DevisComponent, children:[
    { path: ':id', loadChildren: () => import('./pages/devis-details/devis-details.module').then(m => m.DevisDetailsModule)},
    { path: '', pathMatch: 'full', loadChildren: () => import('./pages/devis-list/devis-list.module').then(m => m.DevisListModule) }
  ]}
  ]

 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevisRoutingModule { }
